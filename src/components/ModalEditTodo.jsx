import { Modal, Button, Form, Alert } from 'react-bootstrap';

function ModalEditTodo(props) {
    return (
        <Modal show={props.showEdit} onHide={props.handleCloseEdit}>
            <Modal.Header closeButton>
                <Modal.Title>{props.titleEdit}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Alert variant="danger" className={props.display}>
                {props.alert}
            </Alert>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label><b>Task</b></Form.Label>
                        <Form.Control type="text" value={props.taskEdit} onChange={(e)=> props.setTaskEdit(e.target.value)}  />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label><b>Status</b></Form.Label>
                        <Form.Select aria-label="Default select example" onChange={(e)=> props.setStatusEdit(e.target.value)}>
                            <option value={props.statusEdit}>{props.statusEdit}</option>
                            <option value="Todo">Todo</option>
                            <option value="Progress">Progress</option>
                            <option value="Finish">Finish</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleCloseEdit}>
                    Close
                </Button>
                <Button type="submit" variant="primary" onClick={props.handleSaveEdit}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalEditTodo;