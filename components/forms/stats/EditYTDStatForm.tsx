import { useState } from 'react';
import { useRouter } from 'next/router';
import useAxios from '@/lib/utils/axios';
import { useForm, SubmitHandler } from 'react-hook-form';

import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
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

const EditYTDStatForm = ({ item }: { item: any }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<YTDStatInputs>({
    defaultValues: item,
  });
  const api = useAxios();
  const router = useRouter();
  const [message, setMessage] = useState<string>('');
  console.log('item props', item);

  const onSubmit: SubmitHandler<YTDStatInputs> = async (data) => {
    try {
      console.log('data onSubmit', data);
      const itemData = {
        quarter: data.quarter,
        company: data.company,
        title: data.title,
        market: data.market,
        avg_sales_cycle: data.avg_sales_cycle,
        avg_deal_size: data.avg_deal_size,
        industry: data.industry,
      };
      console.log('itemData', itemData);
      const response = await api.patch(`/ytd-stats/${item.id}/`, itemData);
      console.log('response', response);
      if (response.status === 200) {
        router.push('/profile');
      }
      return response;
    } catch (error: any) {
      console.error('error', error);
      setMessage(error.message);
    }
  };

  if (!item.quarter) return <Spinner />;

  return (
    <>
      <h3 className="mb-3">Edit YTD Stat</h3>
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
            type="number"
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
        <div className="mt-4">
          <Button variant="primary" type="submit">
            Update
          </Button>
          <Button variant="light" onClick={() => router.push('/profile')}>
            Cancel
          </Button>
        </div>
      </Form>
      {message ? <Alert variant="danger">{message}</Alert> : null}
    </>
  );
};

export default EditYTDStatForm;
