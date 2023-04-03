import { Modal, Button, Form, Alert } from 'react-bootstrap';

function ModalAddTodo(props) {       

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Alert variant="danger" className={props.display}>
                {props.alert}
            </Alert>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label><b>Task</b></Form.Label>
                        <Form.Control type="text" placeholder="Task Name" onChange={(e)=> props.setTask(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label><b>Status</b></Form.Label>
                        <Form.Select aria-label="Default select example" onChange={(e)=> props.setStatus(e.target.value)}>
                            <option>Pilih</option>
                            <option value="Todo">Todo</option>
                            <option value="Progress">Progress</option>
                            <option value="Finish">Finish</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
                <Button type="submit" variant="primary" onClick={props.handleSave}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalAddTodo;