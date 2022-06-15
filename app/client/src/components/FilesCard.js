import React from 'react'

export const FilesCard = (props) => {
  return (
    <React.Fragment>
        <div className="card">
        <div className="card-body">
          {props.fileName}
        </div>
      </div>
    </React.Fragment>
  )
}
