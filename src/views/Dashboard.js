import React, { useEffect, useState } from "react";
import GridImages from "../components/ImageGrid/ImageGrid";
import { Card, Row, Col } from "react-bootstrap";
import noimage from "../assets/img/no-image-available.jpeg";
import ConfirmPopup from "./Popup";
import postService from "../services/post.service";
import {toast} from 'react-toastify';
import Loader from "react-loader-spinner";

function Dashboard() {
  const [post, setPost] = useState(null);
  const [loaderVisible, setLoaderVisible] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      loadPosts();
    } else {
      history.push("/login");
    }
  }, []);

  const loadPosts = () => {
    setLoaderVisible(true);
    postService.getAllPosts().then((resp) => {
      const filteredPosts = resp.postsByType.map((item) => {
        const images = item.uploads.map((image) => {
          if(!image.metadata?.duration)
            return image.url;
          else 
            return noimage;
        });
        const { id, topic, description } = item;
        return { id, topic, description, images };
      });
      setLoaderVisible(false);
      setPost(filteredPosts);
    });
  };

  const addToCommunity = (postId) =>{
    postService.enrollToCommunity(postId).then((resp) => {
      toast.success(`Post added successfully in community.${resp}`)
      loadPosts();
    });
  };

  return (
    <>
      <div>
        <div style={{textAlign:"center"}}>
          <Loader
            type="ThreeDots"
            color="#00BFFF"
            height={80} width={80}
            visible={loaderVisible}
          />
        </div>
     
        <Row>
          {post &&
            post.map((data) => {
              return (
                <Col lg="3" sm="6" key={`col${data.id}`}>
                  <Card className="card-stats">
                    <Card.Title
                      className="title"
                      as="h3"
                      style={{
                        textAlign: "center",
                        fontSize: "20px",
                        fontWeight: "bold",
                        marginTop: "5px",
                      }}
                    >
                      {data.id } {data.topic}
                    </Card.Title>
                    {data.images.length > 0 ? (
                      <GridImages images={data.images}></GridImages>
                    ) : (
                      <div className="grid-container">
                        <div className="container">
                          <div className="row">
                            <div
                              className="border height-three background col-md-12 col-12"
                              style={{ background: `url(${noimage})`}}
                            >
                              <div className="cover slide"></div>
                              <div className="cover-text slide animate-text"></div>

                              {/* <span style={{ textAlign: "centre" }}>
                                No Image
                              </span> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <Card.Footer className="text-center">
                      <hr></hr>
                      <div className="stats">
                        {data.description ? (
                          data.description
                        ) : (
                          <>
                            <span style={{ textAlign: "centre" }}>
                              No Description
                            </span>
                          </>
                        )}
                      </div>
                      <hr></hr>
                      <div>
                        <ConfirmPopup postId={data.id} onreload={addToCommunity} />
                      </div>
                    </Card.Footer>
                  </Card>
                </Col>
              );
            })}
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
