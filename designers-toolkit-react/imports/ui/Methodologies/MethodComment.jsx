import React, {useState} from "react";
import Row  from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import { useTracker } from 'meteor/react-meteor-data';
import Container from "react-bootstrap/Container";



const MethodComment = ({comment, saveComment}) => {

    const [newComment, setCommentValue] = useState(comment);

    const editComment = e => {
        setCommentValue(e);
    }

    return(
        <div>
            <div className="row justify-content-md-center mb-6">
                <Col md="auto"> 
                        <div className="team-note">
                            <textarea className="note-textarea"
                                placeholder="Write your notes here..."
                                rows="20"
                                cols="10"
                                onChange={(e) => editComment(e.target.value)}
                            >{comment}</textarea>
                        </div>
                    </Col>
            </div>
            <div className="row justify-content-md-center mb-1">
                <div className="col-sm-2 mt-3">
                    <button className="dashboardSignInButton" onClick={() => saveComment(newComment)}><p className="buttonText">Save</p></button>
                </div>
            </div>
        </div>

    );
}

export default MethodComment;