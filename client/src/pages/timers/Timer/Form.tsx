import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import React from 'react';
import * as yup from 'yup';

import timerCreate from '~/src/api/timerCreate';
import timerUpdate from '~/src/api/timerUpdate';
import { TimerWithMessages } from '~/src/types/TimerWithMessages';

type FormValues = Omit<TimerWithMessages, 'id' | 'messages'>;

const emptyTimer: FormValues = {
  intervalSeconds: 0,
  name: '',
};

const validationSchema = yup.object().shape({
  intervalSeconds: yup
    .number()
    .required('Please enter an interval')
    .max(65535, 'Up to a maximum of 65,535 allowed'),
  name: yup
    .string()
    .required('Please enter a name')
    .max(255, 'Maximum length of 255 allowed'),
});

interface TimerFormProps {
  onError(): void;
  onSuccess(): void;
  timer?: TimerWithMessages;
}

const TimerForm: React.FC<TimerFormProps> = ({ onError, onSuccess, timer }) => {
  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    touched,
    values,
  } = useFormik<FormValues>({
    initialValues: timer ?? emptyTimer,
    onSubmit: async (submittedValues) => {
      try {
        if (timer?.id) {
          await timerUpdate({ id: timer.id, ...submittedValues });
        } else {
          await timerCreate(submittedValues);
        }
        onSuccess();
      } catch (error) {
        onError();
      }
    },
    validationSchema,
  });

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardContent>
          <TextField
            error={Boolean(errors.name) && Boolean(touched.name)}
            fullWidth
            helperText={touched.name && errors.name}
            label="Name"
            margin="normal"
            name="name"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.name}
          />
          <TextField
            error={
              Boolean(errors.intervalSeconds) &&
              Boolean(touched.intervalSeconds)
            }
            fullWidth
            helperText={touched.intervalSeconds && errors.intervalSeconds}
            label="Interval (seconds)"
            margin="normal"
            name="intervalSeconds"
            onBlur={handleBlur}
            onChange={handleChange}
            type="number"
            value={values.intervalSeconds}
          />
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            disabled={isSubmitting}
            type="submit"
            variant="contained"
          >
            Save
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

export default TimerForm;
