import { useState } from 'react';
import useAxios from '@/lib/utils/axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import EditAwardRecognitionForm from './forms/stats/EditAwardRecognitionForm';
import NewAwardRecognitionForm from './forms/stats/NewAwardRecognitionForm';

const testData = [
  {
    id: '1',
    name: '🏆 Top revenue producer in Q1 2023, 145% quota attainment',
  },
  {
    id: '2',
    name: '🌴 Presidents Club winner 2021',
  },
  {
    id: '3',
    name: '💰 Top earner 2020 Add award & recognition',
  },
];

const AwardsRecognition = ({ data }: { data: any }) => {
  const api = useAxios();
  const [show, setShow] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editAwardItem, setEditAwardItem] = useState({});

  // Add modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // Edit modal
  const handleCloseEditModal = () => {
    setEditAwardItem({});
    setShowEditModal(false);
  };
  // @ts-ignore
  const handleShowEditModal = (item: CareerStatsInputs) => {
    console.log('item', item);
    setEditAwardItem(item);
    setShowEditModal(true);
  };

  return (
    <div className="mt-3">
      <h5>Awards &amp; Recognition</h5>
      {data.map((award: any) => (
        <p key={award.id}>
          <Button
            variant="link"
            className="text-muted"
            onClick={() => handleShowEditModal(award)}
          >
            Edit
          </Button>
          <span>{award.text}</span>
        </p>
      ))}

      <Button
        className="mt-3 pill-btn"
        variant="outline-primary"
        onClick={handleShow}
      >
        Add Award
      </Button>

      {/* New Award Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Award</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NewAwardRecognitionForm closeModal={handleClose} />
        </Modal.Body>
      </Modal>

      {/* Edit Award Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Awards &amp; Recognition Stat</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditAwardRecognitionForm
            item={editAwardItem}
            closeModal={handleCloseEditModal}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AwardsRecognition;
