import useAxios from '@/lib/utils/axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { YTDStatInputs } from './NewYTDStatForm';
import {
  quarterChoices,
  salesCycleChoices,
  dealSizeChoices,
  industryChoices,
  jobTitleChoices,
  marketChoices,
} from './constants';
const EditYTDStatForm = ({
  item,
  closeModal,
}: {
  item: any;
  closeModal: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<YTDStatInputs>();
  const api = useAxios();
  console.log('item props', item);

  const onSubmit: SubmitHandler<YTDStatInputs> = async (data) => {
    try {
      console.log('data onSubmit', data);
      const itemData = {
        quarter: data.quarter ?? item.quarter,
        company: data.company ?? item.company,
        title: data.title ?? item.title,
        market: data.market ?? item.market,
        avg_sales_cycle: data.avg_sales_cycle ?? item.average_sales_cycle,
        avg_deal_size: data.avg_deal_size ?? item.average_deal_size,
        industry: data.industry ?? item.industry,
        leaderboard_rank: data.leaderboard_rank ?? item.leaderboard_rank,
      };
      console.log('itemData', itemData);
      const response = await api.patch(`/ytd-stats/${item.id}/`, itemData);
      console.log('response', response);
      if (response.status === 200) {
        closeModal();
      }
      return response;
    } catch (error) {
      console.error('error', error);
    }
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="formYTDStatQuarter">
        <Form.Label>Quarter</Form.Label>
        <Form.Select aria-label="Select Quarter" {...register('quarter')}>
          <option>Select Quarter</option>
          {quarterChoices.map((title: any) => (
            <option
              key={title.value}
              value={title.value}
              selected={item.quarter == title.value}
            >
              {title.label}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formYTDStatCompany">
        <Form.Label>Company</Form.Label>
        <Form.Control
          type="text"
          defaultValue={item.company}
          placeholder="Enter Company"
          {...register('company')}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formYTDStatTitle">
        <Form.Label>Title</Form.Label>
        <Form.Select aria-label="Select Job Title" {...register('title')}>
          <option>Select Job Title</option>
          {jobTitleChoices.map((title: any) => (
            <option
              key={title.value}
              value={title.value}
              selected={item.title == title.value}
            >
              {title.label}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formYTDStatMarket">
        <Form.Label>Market</Form.Label>
        <Form.Select aria-label="Select Market Type" {...register('market')}>
          <option>Select Market Type</option>
          {marketChoices.map((title: any) => (
            <option
              key={title.value}
              value={title.value}
              selected={item.market == title.value}
            >
              {title.label}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group
        className="mb-3"
        controlId="formYTDStatpercentQuotaAttainment"
      >
        <Form.Label>Percent Quota Attainment</Form.Label>
        <Form.Control
          type="text"
          defaultValue={item.quota_attainment_percentage}
          placeholder="Enter % Quota Attainment"
          {...register('quota_attainment_percentage')}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formYTDStatAvgDealSize">
        <Form.Label>Avg Deal Size</Form.Label>
        <Form.Select
          aria-label="Select Avg Deal Size"
          {...register('avg_deal_size')}
        >
          <option>Select Deal Size</option>
          {dealSizeChoices.map((title: any) => (
            <option
              key={title.value}
              value={title.value}
              selected={item.average_deal_size == title.value}
            >
              {title.label}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formYTDStatAvgSalesCycle">
        <Form.Label>Avg Sales Cycle</Form.Label>
        <Form.Select
          aria-label="Select Avg Sales cycle"
          {...register('avg_sales_cycle')}
        >
          <option>Select Sales Cycle</option>
          {salesCycleChoices.map((title: any) => (
            <option
              key={title.value}
              value={title.value}
              selected={item.average_sales_cycle == title.value}
            >
              {title.label}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formYTDStatIndustry">
        <Form.Label>Industry</Form.Label>
        <Form.Select aria-label="Select Industry" {...register('industry')}>
          <option>Select Industry</option>
          {industryChoices.map((title: any) => (
            <option
              key={title.value}
              value={title.value}
              selected={item.industry === title.value}
            >
              {title.label}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formYTDStatLeaderboardRank">
        <Form.Label>Leaderboard Rank</Form.Label>
        <Form.Control
          type="text"
          placeholder="#2"
          defaultValue={item.leaderboard_rank}
          {...register('leaderboard_rank')}
        />
      </Form.Group>
      <div className="mt-4">
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <Button variant="light" onClick={closeModal}>
          Cancel
        </Button>
      </div>
    </Form>
  );
};

export default EditYTDStatForm;
