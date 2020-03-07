/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable prefer-template */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-plusplus */
/* eslint-disable react/destructuring-assignment */
import { h, Component } from 'preact'
import accepts from 'attr-accept'

const supportMultiple =
  typeof document !== 'undefined' && document && document.createElement
    ? 'multiple' in document.createElement('input')
    : true

class Dropzone extends Component {
  constructor(props, context) {
    super(props, context)
    this.onClick = this.onClick.bind(this)
    this.onDragStart = this.onDragStart.bind(this)
    this.onDragEnter = this.onDragEnter.bind(this)
    this.onDragLeave = this.onDragLeave.bind(this)
    this.onDragOver = this.onDragOver.bind(this)
    this.onDrop = this.onDrop.bind(this)
    this.onFileDialogCancel = this.onFileDialogCancel.bind(this)
    this.fileAccepted = this.fileAccepted.bind(this)
    this.isFileDialogActive = false

    this.state = {
      isDragActive: false
    }
  }

  componentDidMount() {
    this.enterCounter = 0
    // Tried implementing addEventListener, but didn't work out
    document.body.onfocus = this.onFileDialogCancel
  }

  componentWillUnmount() {
    // Can be replaced with removeEventListener, if addEventListener works
    document.body.onfocus = null
  }

  onDragStart(e) {
    if (this.props.onDragStart) {
      this.props.onDragStart.call(this, e)
    }
  }

  onDragEnter(e) {
    e.preventDefault()

    // Count the dropzone and any children that are entered.
    ++this.enterCounter

    // This is tricky. During the drag even the dataTransfer.files is null
    // But Chrome implements some drag store, which is accesible via dataTransfer.items
    const dataTransferItems =
      e.dataTransfer && e.dataTransfer.items ? e.dataTransfer.items : []

    // Now we need to convert the DataTransferList to Array
    const allFilesAccepted = this.allFilesAccepted(
      Array.prototype.slice.call(dataTransferItems)
    )

    this.setState({
      isDragActive: allFilesAccepted,
      isDragReject: !allFilesAccepted
    })

    if (this.props.onDragEnter) {
      this.props.onDragEnter.call(this, e)
    }
  }

  onDragOver(e) {
    e.preventDefault()
    e.stopPropagation()
    e.dataTransfer.dropEffect = 'copy' // eslint-disable-line no-param-reassign
    return false
  }

  onDragLeave(e) {
    e.preventDefault()

    // Only deactivate once the dropzone and all children was left.
    if (--this.enterCounter > 0) {
      return
    }

    this.setState({
      isDragActive: false,
      isDragReject: false
    })

    if (this.props.onDragLeave) {
      this.props.onDragLeave.call(this, e)
    }
  }

  onDrop(e) {
    e.preventDefault()

    // Reset the counter along with the drag on a drop.
    this.enterCounter = 0

    this.setState({
      isDragActive: false,
      isDragReject: false
    })

    const droppedFiles = e.dataTransfer ? e.dataTransfer.files : e.target.files
    const max = this.props.multiple
      ? droppedFiles.length
      : Math.min(droppedFiles.length, 1)
    const acceptedFiles = []
    const rejectedFiles = []

    for (let i = 0; i < max; i++) {
      const file = droppedFiles[i]
      // We might want to disable the preview creation to support big files
      if (!this.props.disablePreview) {
        file.preview = window.URL.createObjectURL(file)
      }

      if (this.fileAccepted(file) && this.fileMatchSize(file)) {
        acceptedFiles.push(file)
      } else {
        rejectedFiles.push(file)
      }
    }

    if (this.props.onDrop) {
      this.props.onDrop.call(this, acceptedFiles, rejectedFiles, e)
    }

    if (rejectedFiles.length > 0) {
      if (this.props.onDropRejected) {
        this.props.onDropRejected.call(this, rejectedFiles, e)
      }
    } else if (acceptedFiles.length > 0) {
      if (this.props.onDropAccepted) {
        this.props.onDropAccepted.call(this, acceptedFiles, e)
      }
    }
    this.isFileDialogActive = false
  }

  onClick() {
    if (!this.props.disableClick) {
      this.open()
    }
  }

  onFileDialogCancel() {
    // timeout will not recognize context of this method
    const { onFileDialogCancel } = this.props
    const { fileInputEl } = this
    let { isFileDialogActive } = this
    // execute the timeout only if the onFileDialogCancel is defined and FileDialog
    // is opened in the browser
    if (onFileDialogCancel && isFileDialogActive) {
      setTimeout(() => {
        // Returns an object as FileList
        const FileList = fileInputEl.files
        if (!FileList.length) {
          isFileDialogActive = false
          onFileDialogCancel()
        }
      }, 300)
    }
  }

  fileAccepted(file) {
    return accepts(file, this.props.accept)
  }

  fileMatchSize(file) {
    return file.size <= this.props.maxSize && file.size >= this.props.minSize
  }

  allFilesAccepted(files) {
    return files.every(this.fileAccepted)
  }

  open() {
    this.isFileDialogActive = true
    this.fileInputEl.value = null
    this.fileInputEl.click()
  }

  render() {
    const {
      accept,
      activeClassName,
      inputProps,
      multiple,
      name,
      rejectClassName,
      ...rest
    } = this.props

    let {
      activeStyle,
      className,
      rejectStyle,
      style,
      ...props // eslint-disable-line prefer-const
    } = rest

    const { isDragActive, isDragReject } = this.state

    className = className || ''

    if (isDragActive && activeClassName) {
      className += ' ' + activeClassName
    }
    if (isDragReject && rejectClassName) {
      className += ' ' + rejectClassName
    }

    if (!className && !style && !activeStyle && !rejectStyle) {
      style = {
        width: 200,
        height: 200,
        borderWidth: 2,
        borderColor: '#666',
        borderStyle: 'dashed',
        borderRadius: 5
      }
      activeStyle = {
        borderStyle: 'solid',
        backgroundColor: '#eee'
      }
      rejectStyle = {
        borderStyle: 'solid',
        backgroundColor: '#ffdddd'
      }
    }

    let appliedStyle
    if (activeStyle && isDragActive) {
      appliedStyle = {
        ...style,
        ...activeStyle
      }
    } else if (rejectStyle && isDragReject) {
      appliedStyle = {
        ...style,
        ...rejectStyle
      }
    } else {
      appliedStyle = {
        ...style
      }
    }

    const inputAttributes = {
      accept,
      type: 'file',
      style: { display: 'none' },
      multiple: supportMultiple && multiple,
      ref: el => (this.fileInputEl = el), // eslint-disable-line
      onChange: this.onDrop
    }

    if (name && name.length) {
      inputAttributes.name = name
    }

    // Remove custom properties before passing them to the wrapper div element
    const customProps = [
      'disablePreview',
      'disableClick',
      'onDropAccepted',
      'onDropRejected',
      'maxSize',
      'minSize',
      'onFileDialogCancel'
    ]
    const divProps = { ...props }
    customProps.forEach(prop => delete divProps[prop])

    return (
      <div
        className={className}
        style={appliedStyle}
        {
          ...divProps /* expand user provided props first so event handlers are never overridden */
        }
        onClick={this.onClick}
        onDragStart={this.onDragStart}
        onDragEnter={this.onDragEnter}
        onDragOver={this.onDragOver}
        onDragLeave={this.onDragLeave}
        onDrop={this.onDrop}
      >
        {this.props.children}
        <input
          {
            ...inputProps /* expand user provided inputProps first so inputAttributes override them */
          }
          {...inputAttributes}
        />
      </div>
    )
  }
}

Dropzone.defaultProps = {
  disablePreview: false,
  disableClick: false,
  multiple: true,
  maxSize: Infinity,
  minSize: 0
}

export default Dropzone
