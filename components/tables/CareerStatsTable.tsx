/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import NewCareerStatForm from '../forms/stats/NewCareerStatForm';
import EditCareerStatForm from '../forms/stats/EditCareerStatForm';
import checkmark from '@/assets/icons/checkmark.svg';

interface CareerStatsInputs {
  year: string;
  company: string;
  title: string;
  market: string;
  percentQuotaAttainment: string;
  avgDealSize: string;
  avgSalesCycle: string;
  industry?: string;
  leaderboardRank?: string;
}

const CareerStatsTable = ({ data }: { data: any }) => {
  const [show, setShow] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editYtdItem, setEditYtdItem] = useState({});

  // Add modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Edit modal
  const handleCloseEditModal = () => {
    setEditYtdItem({});
    setShowEditModal(false);
  };
  // @ts-ignore
  const handleShowEditModal = (item: CareerStatsInputs) => {
    console.log('item', item);
    setEditYtdItem(item);
    setShowEditModal(true);
  };

  return (
    <>
      <Table responsive striped>
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
            <th>Industry</th>
            <th>Leaderboard Rank</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: any) => (
            <tr key={item.id}>
              <td>
                {item.quota_verified ? (
                  <img src={checkmark.src} alt="checkmark" />
                ) : (
                  '-'
                )}
              </td>
              <td>{item.year}</td>
              <td>{item.company}</td>
              <td>{item.title}</td>
              <td>{item.market}</td>
              <td>{item.quota_attainment_percentage}</td>
              <td>{item.average_deal_size}</td>
              <td>{item.average_sales_cycle}</td>
              <td>{item.industry}</td>
              <td>{item.leaderboard_rank}</td>
              <td>
                <Button
                  variant="link"
                  className="text-muted"
                  onClick={() => handleShowEditModal(item)}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button
        className="my-3 pill-btn"
        variant="outline-primary"
        onClick={handleShow}
      >
        Add Year
      </Button>
      {/* New Career Stat Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Career Stat</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NewCareerStatForm closeModal={handleClose} />
        </Modal.Body>
      </Modal>
      {/* Edit Career Stat Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Career Stat</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditCareerStatForm
            item={editYtdItem}
            closeModal={handleCloseEditModal}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};
export default CareerStatsTable;
