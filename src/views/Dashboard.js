import React, { useEffect, useState } from "react";
import data from "../assets/data/data.json";
import FbGridImages from "../components/ImageGrid/ImageGrid";
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

import ConfirmPopup from "./Popup";
import postService  from "../services/post.service";

function Dashboard() {
  const [post, setPost] = useState(null);
  
  const handleShow = () =>{
    loadPosts();
  };

  useEffect(() => {
      if(localStorage.getItem("token")){
        loadPosts();
      } else {
        history.push("/login");
      }
  }, []);

  const loadPosts = () => {
    postService.getAllPosts().then((resp) => {
      const filteredPosts = resp.postsByType.map((item) => {
        const images = item.uploads.map((image) => {
          return image.url;
        });
        const { id, topic, description } = item;
        return { id, topic, description, images };
      });
      setPost(filteredPosts);
    })
  }

  return (
    <>
      <div>
        <Row>
          {post &&
            post.map((data) => {
              return (
                <Col lg="3" sm="6">
                  <Card className="card-stats" key={data.id}>
                    <Card.Title
                      as="h3"
                      style={{
                        textAlign: "center",
                        fontSize: "20px",
                        fontWeight: "bold",
                        marginTop: "5px",
                      }}
                    >
                      {data.topic}
                    </Card.Title>
                    {data.images.length > 0 ? <FbGridImages images={data.images}></FbGridImages> : null}
                    
                    <Card.Footer className="text-center">
                      <hr></hr>
                      <div className="stats">{data.description}</div>
                      <hr></hr>
                      <div >
                          <ConfirmPopup postId={data.id} onreload={handleShow}/>
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
