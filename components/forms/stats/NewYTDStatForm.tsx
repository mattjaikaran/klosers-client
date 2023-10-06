import useAxios from '@/lib/utils/axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/lib/store/redux';
import { useRouter } from 'next/router';
import { getUserYTDStats } from '@/lib/store/authSlice';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {
  quarterChoices,
  salesCycleChoices,
  dealSizeChoices,
  industryChoices,
  jobTitleChoices,
  marketChoices,
} from './constants';
import { YTDStatInputs } from '@/types/stats';

const NewYTDStatForm = ({ closeModal }: { closeModal?: any }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<YTDStatInputs>();
  const api = useAxios();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const data: any = useAppSelector((state) => state.auth);
  const user: any = data.user.data;

  const onSubmit: SubmitHandler<YTDStatInputs> = async (data) => {
    try {
      console.log(data);
      const newYtdStat = {
        user: user.id,
        quarter: data.quarter,
        company: data.company,
        title: data.title,
        market: data.market,
        quota_attainment_percentage: data.quota_attainment_percentage,
        avg_deal_size: data.avg_deal_size,
        avg_sales_cycle: data.avg_sales_cycle,
        industry: data.industry,
      };
      console.log('newYtdStat', newYtdStat);
      const response = await api.post('/ytd-stats/', newYtdStat);
      console.log('response', response);
      if (response.status === 201) {
        const ytdResponse = await api.get('/ytd-stats/');
        dispatch(getUserYTDStats(ytdResponse.data));

        if (ytdResponse.status === 200) router.push('/profile');
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
            <option key={title.value} value={title.value}>
              {title.label}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formYTDStatCompany">
        <Form.Label>Company</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Company"
          {...register('company')}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formYTDStatTitle">
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
      <Form.Group className="mb-3" controlId="formYTDStatMarket">
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
        controlId="formYTDStatpercentQuotaAttainment"
      >
        <Form.Label>Percent Quota Attainment</Form.Label>
        <Form.Control
          type="number"
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
            <option key={title.value} value={title.value}>
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
          <option>Select Deal Size</option>
          {salesCycleChoices.map((title: any) => (
            <option key={title.value} value={title.value}>
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

export default NewYTDStatForm;
