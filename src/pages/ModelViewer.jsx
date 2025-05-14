import React, { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Button, Modal, Form, Container, Row, Col, Card } from "react-bootstrap";
import { allPost, uploadPost } from "../services/allAPI";
import { toast } from "react-toastify";


const UploadedModel = ({ model }) => {
  const fileUrl = `http://localhost:3000/uploads/${model.modelfile}`;
  const { scene } = useGLTF(fileUrl);

  return <primitive object={scene} scale={0.1} />;
};

const ModelViewer = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [model, setModel] = useState({ modelfile: "", title: "" });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getAllPost = async () => {
    const apiResponse = await allPost();
    setData(apiResponse.data);
  };

  useEffect(() => {
    getAllPost();
  }, []);

  const addPost = async () => {
    if (model.modelfile && model.title) {
      const payload = new FormData();
      payload.append("modelfile", model.modelfile);
      payload.append("title", model.title);

      try {
        const response = await uploadPost(payload, { "Content-Type": "multipart/form-data" });

        if (response.status === 201) {
          toast.success("Successfully uploaded!");
          setShow(false);
          setModel({ modelfile: "", title: "" });
          getAllPost();
        } else {
          toast.warning(response.statusText);
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      toast.error("Fill the Form");
    }
  };

  return (
    <Container className="py-4">
      <Row className="mb-4 justify-content-between align-items-center">
        <Col><h2>Your 3D Model Gallery</h2></Col>
        <Col className="text-end">
          <Button variant="primary" onClick={handleShow}>
            + Add Model
          </Button>
        </Col>
      </Row>

      <Row>
        {data.map((obj, index) => (
          <Col md={6} lg={4} className="mb-4" key={index}>
            <Card className="shadow rounded-4">
              <Card.Header className="text-center fw-bold">{obj.title}</Card.Header>
              <Card.Body style={{ height: "400px" }}>
                <Canvas camera={{ position: [0, 1, 3], fov: 30 }}>
                  <ambientLight />
                  <directionalLight position={[0, 5, 5]} intensity={1} />
                  <Suspense fallback={null}>
                    <UploadedModel model={obj} />
                  </Suspense>
                  <OrbitControls />
                </Canvas>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Upload New Model</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter model title"
                value={model.title}
                onChange={(e) => setModel({ ...model, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Select .glb File</Form.Label>
              <Form.Control
                type="file"
                accept=".glb"
                onChange={(e) =>
                  setModel({ ...model, modelfile: e.target.files[0] })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={addPost}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ModelViewer;
