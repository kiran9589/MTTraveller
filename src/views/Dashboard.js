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

function Dashboard() {
  const [post, setPost] = useState(null);
  
  const handleShow = () =>{
    console.log("Excute call");
  };

  useEffect(() => {
    if (data) {
      const filteredPosts = data.postsByType.map((item) => {
        const images = item.uploads.map((image) => {
          return image.url;
        });
        const { id, topic, description } = item;
        return { id, topic, description, images };
      });
      setPost(filteredPosts);
    }
  }, []);

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
                    <FbGridImages images={data.images}></FbGridImages>
                    <Card.Footer className="text-center">
                      <hr></hr>
                      <div className="stats">{data.description}</div>
                      <hr></hr>
                      <div >
                          <ConfirmPopup onreload={handleShow}/>
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
