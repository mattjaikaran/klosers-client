import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import data from '@/data/stats.json';

const LeaderboardTable = () => {
  const [show, setShow] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Add modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // Edit modal
  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowEditModal = () => setShowEditModal(true);
  return (
    <>
      <Table responsive>
        <thead>
          <tr>
            <th>Quota Verified</th>
            <th>Year</th>
            <th>Company</th>
            <th>Title</th>
            <th>Market</th>
            <th>% Quota Attainment</th>
            <th>Avg Deal Size</th>
            <th>Avg Sales Cycle</th>
            <th>Leaderboard Rank</th>
            <th>Industry</th>
            <th>LinkedIn</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: any) => (
            <tr key={item.id}>
              <td>{item.quota_verified ? 'Verified' : '-'}</td>
              <td>{item.year}</td>
              <td>{item.company}</td>
              <td>{item.title}</td>
              <td>{item.market}</td>
              <td>{item.quota_attainment_percent}</td>
              <td>{item.avg_deal_size}</td>
              <td>{item.avg_sales_cycle}</td>
              <td>{item.leaderboard_rank}</td>
              <td>{item.industry}</td>
              <td>-</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Career Stat</Modal.Title>
        </Modal.Header>
        <Modal.Body>Editform</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCloseEditModal}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LeaderboardTable;
