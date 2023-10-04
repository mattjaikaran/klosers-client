/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import NewYTDStatForm from '../forms/stats/NewYTDStatForm';
import EditYTDStatForm from '../forms/stats/EditYTDStatForm';
import checkmark from '@/assets/icons/checkmark.svg';

export interface YTDStatsInputs {
  quarter: string;
  company: string;
  title: string;
  market: string;
  percentQuotaAttainment: string;
  avgDealSize: string;
  avgSalesCycle: string;
  industry?: string;
  leaderboardRank?: string;
}

const YTDStatsTable = ({ data }: { data: any }) => {
  const [show, setShow] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [message, setMessage] = useState<boolean>(false);
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
  const handleShowEditModal = (item: YTDStatsInputs) => {
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
            <th>Quarter</th>
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
              <td>{item.quarter}</td>
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
        Add YTD Stat
      </Button>

      {/* New YTD Stat Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add YTD Stat</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {message ? <Alert variant="danger">{message}</Alert> : null}
          <NewYTDStatForm closeModal={handleClose} />
        </Modal.Body>
      </Modal>

      {/* Edit YTD Stat Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit YTD Stat</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {message ? <Alert variant="danger">{message}</Alert> : null}
          <EditYTDStatForm
            item={editYtdItem}
            closeModal={handleCloseEditModal}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};
export default YTDStatsTable;
