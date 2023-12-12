import { useState } from 'react';
import { useRouter } from 'next/router';
import useAxios from '@/lib/utils/axios';
import { useForm, SubmitHandler } from 'react-hook-form';

import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { industryChoices, jobTitleChoices, marketChoices } from './constants';
import { Stat } from '@/types/stats';

const EditStatForm = ({ item }: { item: any }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Stat>({
    defaultValues: item,
  });
  const api = useAxios();
  const router = useRouter();
  const [message, setMessage] = useState<string>('');
  console.log('item props', item);

  const onSubmit: SubmitHandler<Stat> = async (data) => {
    try {
      console.log('data onSubmit', data);
      const itemData = {
        year: data.year,
        quarter: data.quarter,
        company: data.company,
        title: data.title,
        market: data.market,
        quota: data.quota,
        quota_attainment_percentage: data.quota_attainment_percentage,
        average_deal_size: data.average_deal_size,
        average_sales_cycle: data.average_sales_cycle,
        industry: data.industry,
      };
      console.log('itemData', itemData);
      const response = await api.patch(`/stats/${item.id}/`, itemData);
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
      <h3 className="mb-3">Edit Stat</h3>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formEditStatYear">
          <Form.Label>Year</Form.Label>
          <Form.Control
            type="number"
            defaultValue={item.year}
            placeholder={new Date().getFullYear().toString()}
            {...register('year')}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEditStatQuarter">
          <Form.Label>Quarter</Form.Label>
          <Form.Control
            type="number"
            defaultValue={item.quarter}
            placeholder="Enter Quarter"
            {...register('quarter')}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEditStatCompany">
          <Form.Label>Company</Form.Label>
          <Form.Control
            defaultValue={item.company}
            placeholder="Enter Company"
            {...register('company')}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEditStatTitle">
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
        <Form.Group className="mb-3" controlId="formEditStatMarket">
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
        <Form.Group className="mb-3" controlId="formEditStatQuota">
          <Form.Label>Quota</Form.Label>
          <Form.Control
            type="number"
            defaultValue={item.quota}
            placeholder="Enter Quota"
            {...register('quota')}
            required
          />
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="formEditStatpercentQuotaAttainment"
        >
          <Form.Label>Percent Quota Attainment</Form.Label>
          <Form.Control
            type="number"
            defaultValue={item.quota_attainment_percentage}
            placeholder="Enter % Quota Attainment"
            {...register('quota_attainment_percentage')}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEditStatAverageDealSize">
          <Form.Label>Average Deal Size</Form.Label>
          <Form.Control
            type="number"
            placeholder="Select Average Deal Size"
            {...register('average_deal_size')}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEditStatAverageSalesCycle">
          <Form.Label>Average Sales Cycle</Form.Label>
          <Form.Select
            aria-label="Select Average Sales cycle"
            {...register('average_sales_cycle')}
          >
            <option>Select Sales Cycle</option>
            <option value={30} selected={item.average_sales_cycle === 30}>
              30
            </option>
            <option value={60} selected={item.average_sales_cycle === 60}>
              60
            </option>
            <option value={90} selected={item.average_sales_cycle === 90}>
              90
            </option>
            <option value={120} selected={item.average_sales_cycle === 120}>
              120
            </option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEditStatIndustry">
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

export default EditStatForm;
