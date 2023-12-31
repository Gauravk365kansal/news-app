import React from "react";

 const NewItem = (props) => {
  
    let { title, description, imageUrl, newsUrl,author ,pubDate,source} = props;
    return (
      <div className="my-3">
        <div className="card" style={{  }}>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
          <span className="position-absolute top-0  translate-middle badge round-pill bg-danger" style={{left:"90%" ,zIndex: "1"}}>{source}</span>
            <h5 className="card-title">{title}... </h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted"> By {!author?"unknown":author} on <strong>{new Date(pubDate).toGMTString()}</strong></small></p>
            <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark">
              Read More..
            </a>
          </div>
        </div>
      </div>
    );
  }


export default NewItem;
