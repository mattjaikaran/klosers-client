import useAxios from '@/lib/utils/axios';
import { useForm, SubmitHandler } from 'react-hook-form';

import { useAppSelector } from '@/lib/store/redux';
import { useRouter } from 'next/router';
import { Stat } from '@/types/stats';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {
  salesCycleChoices,
  dealSizeChoices,
  industryChoices,
  jobTitleChoices,
  marketChoices,
} from './constants';

// wip
const NewStatForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Stat>();
  const api = useAxios();
  const data: any = useAppSelector((state) => state.auth);
  const user: any = data.user.data;

  const onSubmit: SubmitHandler<Stat> = async (data) => {
    try {
      console.log(data);
      const newCareerStat = {
        user: user.id,
        year: data.year,
        quarter: data.quarter,
        company: data.company,
        title: data.title,
        market: data.market,
        quota_attainment_percentage: data.quota_attainment_percentage,
        average_deal_size: data.average_deal_size,
        average_sales_cycle: data.average_sales_cycle,
        industry: data.industry,
      };
      console.log('newCareerStat', newCareerStat);
      const response = await api.post('/stats/', newCareerStat);
      console.log('response', response);
      if (response.status === 201) {
        router.push('/profile');
      }
      return response;
    } catch (error) {
      console.error('error', error);
    }
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="formStatYear">
        <Form.Label>Year</Form.Label>
        <Form.Control
          type="number"
          placeholder="2023"
          {...register('year')}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formStatQuarter">
        <Form.Label>Quarter</Form.Label>
        <Form.Control
          type="number"
          placeholder="Q3"
          {...register('quarter')}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formStatCompany">
        <Form.Label>Company</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Company"
          {...register('company')}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formStatTitle">
        <Form.Label>Title</Form.Label>
        <Form.Select aria-label="Select Job Title" {...register('title')}>
          <option>Select Job Title</option>
          {jobTitleChoices.map((title: any) => (
            <option key={title.value} value={title.value}>
              {title.label}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formStatMarket">
        <Form.Label>Market</Form.Label>
        <Form.Select aria-label="Select Market Type" {...register('market')}>
          <option>Select Market Type</option>
          {marketChoices.map((title: any) => (
            <option key={title.value} value={title.value}>
              {title.label}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formStatQuota">
        <Form.Label>Quota</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter Quota"
          {...register('quota')}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formStatPercentQuotaAttainment">
        <Form.Label>Percent Quota Attainment</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter % Quota Attainment"
          {...register('quota_attainment_percentage')}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formStatAverageDealSize">
        <Form.Label>Average Deal Size</Form.Label>
        <Form.Control
          type="number"
          placeholder="Select Average Deal Size"
          {...register('average_deal_size')}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formStatAverageSalesCycle">
        <Form.Label>Average Sales Cycle</Form.Label>
        <Form.Select
          aria-label="Select Average Sales cycle"
          {...register('average_sales_cycle')}
        >
          <option>Select Sales Cycle</option>
          <option value={30}>30</option>
          <option value={60}>60</option>
          <option value={90}>90</option>
          <option value={120}>120</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formStatIndustry">
        <Form.Label>Industry</Form.Label>
        <Form.Select aria-label="Select Industry" {...register('industry')}>
          <option>Select Industry</option>
          {industryChoices.map((title: any) => (
            <option key={title.value} value={title.value}>
              {title.label}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <div className="mt-4">
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <Button variant="light" onClick={() => router.push('/profile')}>
          Cancel
        </Button>
      </div>
    </Form>
  );
};

export default NewStatForm;
