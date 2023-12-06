import useAxios from '@/lib/utils/axios';
import { useForm, SubmitHandler } from 'react-hook-form';

import { useAppSelector } from '@/lib/store/redux';
import { useRouter } from 'next/router';
import { Stat } from '@/types/stats';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { industryChoices, jobTitleChoices, marketChoices } from './constants';

const schema = yup
  .object({
    year: yup
      .number()
      .required('Year is required')
      .min(2000)
      .max(new Date().getFullYear() + 1)
      .positive()
      .integer(),
    quarter: yup
      .number()
      .required('Quarter is required')
      .min(1)
      .max(4)
      .positive()
      .integer(),
    company: yup.string().required('Company is required'),
    title: yup.string().required('Title is required'),
    market: yup.string().required('Market is required'),
    quota: yup.number().positive().integer().required('Quota is required'),
    quota_attainment_percentage: yup
      .number()
      .max(999)
      .positive()
      .integer()
      .required('Quota Attainment is required'),
    average_deal_size: yup
      .number()
      .positive()
      .integer()
      .required('Average Deal Size is required'),
    average_sales_cycle: yup
      .number()
      .positive()
      .integer()
      .required('Average Sales Cycle is required'),
    industry: yup.string().required().required('Industry is required'),
  })
  .required();

// wip
const NewStatForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Stat>({
    // @ts-ignore
    resolver: yupResolver(schema),
  });
  const api = useAxios();
  const data: any = useAppSelector((state) => state.auth);
  const user: any = data.user.data;

  console.log('errors', errors);

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
        quota: data.quota,
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
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formStatYear">
          <Form.Label>Year</Form.Label>
          <Form.Control
            type="number"
            placeholder={new Date().getFullYear().toString()}
            {...register('year')}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formStatQuarter">
          <Form.Label>Quarter</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Quarter"
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
            required
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
            <option value={''}>Select Industry</option>
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
      {Object.keys(errors).length > 0 && (
        <Alert variant="danger mt-3">
          Please fix the following:
          <ul>
            {Object.keys(errors).map((field) => (
              <li key={field}>
                {/* @ts-ignore */}
                {errors[field as keyof ProviderSignupFormInputs]?.message}
              </li>
            ))}
          </ul>
        </Alert>
      )}
    </>
  );
};

export default NewStatForm;
