import React, { useEffect, useState } from "react";
import { Card, Row, Col, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import Loader from "react-loader-spinner";
import notificationService from "../services/notification.service";

function Notification() {
  const [loaderVisible, setLoaderVisible] = useState(null);
  const [enableType, setEnableType] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
    } else {
      history.push("/login");
    }
  }, []);

  const onTypeSelect = (event) => {
      const typeList = ['FORUM_POST_DETAILS', 'POST_DETAILS', 'TRIP_DETAILS']
      if(typeList.includes(event.target.value)){
          setEnableType(true)
      } else {
          setEnableType(false)
      }
  }

  const handleSubmit = (event) => {
      const formData = new FormData(event.currentTarget);
      event.preventDefault();
      let notficationObj ={
          title: "", content: "", isPrivate: true, isCompleted: true, isVerified: true, notificationType:"",
          notificationTo:"all"
      }
      for (let [key, value] of formData.entries()) {
        if(key !== 'title' && key !== 'content'  && key !== 'notificationType'&& key !== 'notificationTo'){
          if(value == "all"){
            delete notficationObj[key];
          } else {
            notficationObj[key] = JSON.parse(value)
          }
        } else {
          notficationObj[key] = value;
        }
      }

      setLoaderVisible(true);
      notificationService.sendNotification(notficationObj).then((resp) => {
        toast.success(`Notfication successfully triggered for ${resp.sendCommonNotification} users !!!`);
        event.target.reset();
        setLoaderVisible(false);
      });
  };

  return (
    <>
    <div className="card col-12 center">
        {loaderVisible ? (
          <div style={{ textAlign: "center" }}>
            <Loader
              type="ThreeDots"
              color="#00BFFF"
              height={40}
              width={40}
              visible={loaderVisible}
            />
          </div>
        ) : (
          <>
          </>
        )}

        <Form onSubmit={handleSubmit} className="hv-center">
               <Row>
                  <div className="form-group col-lg-6">
                      <label>Notification Type <span style={{color:'red'}}> * </span></label>
                      <select name="notificationType" className="form-control" onChange={onTypeSelect}>
                        <option value="APP_UPDATE">APP UPDATE</option>
                        <option value="CUSTOM_NOTIFICATION">CUSTOM NOTIFICATION</option>
                        <option value="FORUM_POST_DETAILS">FORUM POST DETAILS</option>
                        <option value="POST_DETAILS">POST DETAILS</option>
                        <option value="TRIP_DETAILS">TRIP DETAILS</option>
                        <option value="FRIEND_SUGGESTIONS">FRIEND SUGGESTIONS</option>
                      </select>
                  </div>
                  {enableType ? (
                    <div className="form-group col-lg-6">
                      <label>Type ID <span style={{color:'red'}}> * </span></label>
                      <input type="text" 
                            className="form-control" 
                            name="typeId" 
                            placeholder="Enter Type ID"
                            required
                      />
                    </div>
                  ): null}
                  
                </Row>
                <Row>
                  <div className="form-group col-lg-12">
                      <label>Title <span style={{color:'red'}}> * </span></label>
                      <input type="text" 
                            className="form-control" 
                            name="title" 
                            placeholder="Enter title"
                            required
                      />
                    </div>
                </Row>
                <Row>
                  <div className="form-group col-lg-12">
                      <label>Content <span style={{color:'red'}}> * </span></label>
                      <textarea  
                            className="form-control" 
                            name="content" 
                            placeholder="Enter content for notification"
                            required
                      />
                    </div>
                </Row>                
                <Row>
                  <div className="form-group col-lg-4">
                    <label>Private</label>
                    <select name="isPrivate" className="form-control" >
                      <option value="all">All</option>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </div>
                  <div className="form-group col-lg-4">
                    <label>Completed</label>
                    <select name="isCompleted" className="form-control" >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                      <option value="all">All</option>
                    </select>
                  </div>
                  <div className="form-group col-lg-4">
                    <label>Verified</label>
                    <select name="isVerified" className="form-control" >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                      <option value="all">All</option>
                    </select>
                  </div>
                </Row>
                <Row>
                  <div className="form-group col-lg-4">
                      <label>Notification To</label>
                      <select name="notificationTo" className="form-control" >
                        <option value="all">All</option>
                        <option value="test">Test Users</option>
                      </select>
                    </div>
                </Row> 
                
                <div className="footer" align="right"> 
                  <button className="btn btn-secondary mr-2" type="reset" disabled={loaderVisible}>
                      Reset
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={loaderVisible}>
                      Send Notification
                  </button>
                </div>
            </Form>
            
        </div>
    </>
  );
}

export default Notification;
