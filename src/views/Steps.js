import React, { useEffect, useState } from "react";
import GridImages from "../components/ImageGrid/ImageGrid";
import { Card, Row, Col, Button } from "react-bootstrap";
import noimage from "../assets/img/no-image-available.jpeg";
import ConfirmPopup from "./Popup";
import stepService from "../services/step.service";
import { toast } from "react-toastify";
import Loader from "react-loader-spinner";
import FixedPlugin from "../components/FixedPlugin/FixedPlugin.js";

function Steps() {
  const [post, setPost] = useState(null);
  let [page, setPage] = useState(null);
  const [loaderVisible, setLoaderVisible] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setPage(0)
      loadSteps();
    } else {
      history.push("/login");
    }
  }, []);

  const loadSteps = (position) => {
    if(position == "R"){
      page = page + 1;
      setPage(page);
    } else {
      if(page > 0){
        page = page - 1;
      } else {
        page = 0;
      }
      setPage(page);
    }

    setLoaderVisible(true);
    stepService.getAllSteps(page).then((resp) => {
        if(resp.stepsForCommunityEnroll.length > 0){
          const filteredPosts = resp.stepsForCommunityEnroll.map((item) => {
            const images = item.uploads.map((image) => {
              if (!image.metadata?.duration) return image.url;
              else return noimage;
            });
            const { id, name, description } = item;
            return { id, name, description, images };
          });
          setLoaderVisible(false);
          setPost(filteredPosts);
        } else {
          if(page > 0){
            page = 0;
            setPage(page);
            loadSteps();
          }
          
        }
      
    });
  };

  const addToCommunity = (stepId) => {
    stepService.enrollToCommunity(stepId).then((resp) => {
      toast.success(`Step added successfully in community.`);
      loadSteps();
    });
  };

  return (
    <>
        <Row className="d-flex flex-row-reverse mr-0">
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-end">
              <li className="page-item">
                <a className="page-link" href="#" onClick={() => loadSteps("L")}>
                <span aria-hidden="true">&laquo;</span>
                <span className="sr-only">Previous</span>
                </a>
              </li>
              <li className="page-item"><a className="page-link" href="#">{page+1}</a></li>
              <li className="page-item">
                <a className="page-link" href="#" onClick={() => loadSteps("R")}>
                  <span aria-hidden="true">&raquo;</span>
                  <span className="sr-only">Next</span>
                </a>
              </li>
            </ul>
          </nav>
        </Row>
        {loaderVisible ? (
          <div style={{ textAlign: "center" }}>
            <Loader
              type="ThreeDots"
              color="#00BFFF"
              height={80}
              width={80}
              visible={loaderVisible}
            />
          </div>
        ) : (
          <>
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
                        {data.name}
                        </Card.Title>
                        {data.images.length > 0 ? (
                          <GridImages images={data.images}></GridImages>
                        ) : (
                          <div className="grid-container">
                            <div className="container">
                              <div className="row">
                                <div
                                  className="border height-three background col-md-12 col-12"
                                  style={{ background: `url(${noimage})` }}
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
                            <ConfirmPopup
                              postId={data.id}
                              onreload={addToCommunity}
                              type="Step"
                            />
                          </div>
                        </Card.Footer>
                      </Card>
                    </Col>
                  );
                })}
            </Row>
          </>
        )}
      <Row className="d-flex flex-row-reverse mr-0">
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-end">
              <li className="page-item">
                <a className="page-link" href="#" onClick={() => loadSteps("L")}>
                <span aria-hidden="true">&laquo;</span>
                <span className="sr-only">Previous</span>
                </a>
              </li>
              <li className="page-item"><a className="page-link" href="#">{page+1}</a></li>
              <li className="page-item">
                <a className="page-link" href="#" onClick={() => loadSteps("R")}>
                  <span aria-hidden="true">&raquo;</span>
                  <span className="sr-only">Next</span>
                </a>
              </li>
            </ul>
          </nav>
        </Row>
    </>
  );
}

export default Steps;
