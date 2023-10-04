import useAxios from '@/lib/utils/axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { CareerStatInputs } from './NewCareerStatForm';
import {
  salesCycleChoices,
  dealSizeChoices,
  industryChoices,
  jobTitleChoices,
  marketChoices,
} from './constants';

const EditCareerStatForm = ({
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
  } = useForm<CareerStatInputs>();
  const api = useAxios();

  const onSubmit: SubmitHandler<CareerStatInputs> = async (data) => {
    try {
      console.log(data);
      const itemData = {
        quarter: data.year ?? item.year,
        company: data.company ?? item.company,
        title: data.title ?? item.title,
        market: data.market ?? item.market,
        avg_sales_cycle: data.avg_sales_cycle ?? item.average_sales_cycle,
        avg_deal_size: data.avg_deal_size ?? item.average_deal_size,
        industry: data.industry ?? item.industry,
        leaderboard_rank: data.leaderboard_rank ?? item.leaderboard_rank,
      };
      console.log('itemData', itemData);
      const response = await api.patch(`/career-stats/${item.id}/`, itemData);
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
      <Form.Group className="mb-3" controlId="formCareerStatQuarter">
        <Form.Label>Year</Form.Label>
        <Form.Control
          type="text"
          placeholder="2023"
          defaultValue={item.year}
          {...register('year')}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formCareerStatCompany">
        <Form.Label>Company</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Company"
          defaultValue={item.company}
          {...register('company')}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formCareerStatTitle">
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
      <Form.Group className="mb-3" controlId="formCareerStatMarket">
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
        controlId="formCareerStatpercentQuotaAttainment"
      >
        <Form.Label>Percent Quota Attainment</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter % Quota Attainment"
          defaultValue={item.quota_attainment_percentage}
          {...register('quota_attainment_percentage')}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formCareerStatAvgDealSize">
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
      <Form.Group className="mb-3" controlId="formCareerStatAvgSalesCycle">
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
      <Form.Group className="mb-3" controlId="formCareerStatIndustry">
        <Form.Label>Industry</Form.Label>
        <Form.Select aria-label="Select Industry" {...register('industry')}>
          <option>Select Industry</option>
          {industryChoices.map((title: any) => (
            <option
              key={title.value}
              value={title.value}
              selected={item.industry == title.value}
            >
              {title.label}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formCareerStatLeaderboardRank">
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

export default EditCareerStatForm;
