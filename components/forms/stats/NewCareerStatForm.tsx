import useAxios from '@/lib/utils/axios';
import { useForm, SubmitHandler } from 'react-hook-form';

import { useAppSelector } from '@/lib/store/redux';
import { useRouter } from 'next/router';
import { CareerStatInputs } from '@/types/stats';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {
  salesCycleChoices,
  dealSizeChoices,
  industryChoices,
  jobTitleChoices,
  marketChoices,
} from './constants';

const NewCareerStatForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CareerStatInputs>();
  const api = useAxios();
  const data: any = useAppSelector((state) => state.auth);
  const user: any = data.user.data;

  const onSubmit: SubmitHandler<CareerStatInputs> = async (data) => {
    try {
      console.log(data);
      const newCareerStat = {
        user: user.id,
        year: data.year,
        company: data.company,
        title: data.title,
        market: data.market,
        quota_attainment_percentage: data.quota_attainment_percentage,
        avg_deal_size: data.avg_deal_size,
        avg_sales_cycle: data.avg_sales_cycle,
        industry: data.industry,
      };
      console.log('newCareerStat', newCareerStat);
      const response = await api.post('/career-stats/', newCareerStat);
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
      <Form.Group className="mb-3" controlId="formCareerStatQuarter">
        <Form.Label>Year</Form.Label>
        <Form.Control
          type="number"
          placeholder="2023"
          {...register('year')}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formCareerStatCompany">
        <Form.Label>Company</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Company"
          {...register('company')}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formCareerStatTitle">
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
      <Form.Group className="mb-3" controlId="formCareerStatMarket">
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
      <Form.Group
        className="mb-3"
        controlId="formCareerStatpercentQuotaAttainment"
      >
        <Form.Label>Percent Quota Attainment</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter % Quota Attainment"
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
            <option key={title.value} value={title.value}>
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
            <option key={title.value} value={title.value}>
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

export default NewCareerStatForm;
