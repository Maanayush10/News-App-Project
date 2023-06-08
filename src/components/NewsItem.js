import React, { Component } from 'react';

export class News extends Component {
    render() {
        let urlcust = "https://media.istockphoto.com/id/1137226114/photo/3d-fingerprint-maze.webp?b=1&s=170667a&w=0&k=20&c=Ov9OS-eEI3gHn1tIx-Hq-s3R-cfZR04-kvO0aSBDafk="
        let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
        return (
            <>
                <div className="container">
                    <div className="card" >
                        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ left: '86%', zIndex: '1' }}>
                            {!source ? "unknown" : source}
                        </span>
                        <img src={!imageUrl ? urlcust : imageUrl} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{title.slice(0, 88)}...</h5>
                            <p className="card-text"><small className="text-body-secondary">By {author ? author : "unknown"} on {new Date(date).toGMTString()}</small></p>
                            <p className="card-text">{description.slice(0, 76)}...</p>
                            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default News;
