import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import React from 'react';
import * as yup from 'yup';

import commandCreate from '~/src/api/commandCreate';
import commandUpdate from '~/src/api/commandUpdate';
import { CommandKeyword } from '~/src/types/CommandKeyword';
import { CommandWithKeywords } from '~/src/types/CommandWithKeywords';

type FormValues = Omit<CommandWithKeywords, 'id'>;

const emptyCommand: FormValues = {
  command: '',
  description: '',
  keywords: [],
  name: '',
};

const validationSchema = yup.object().shape({
  description: yup.string().required('Please enter a description'),
  keywords: yup
    .array()
    .of(
      yup.object().shape({
        keyword: yup
          .string()
          .required('Please enter a keyword')
          .matches(/[a-zA-Z0-9]+/, 'Only alphanumeric values allowed'),
      })
    )
    .min(1, 'Please add at least one keyword'),
  name: yup.string().required('Please give the command a name'),
});

interface CommandFormProps {
  command?: CommandWithKeywords;
  onError(): void;
  onSuccess(): void;
}

const CommandForm: React.FC<CommandFormProps> = ({
  command,
  onError,
  onSuccess,
}) => {
  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    setFieldValue,
    touched,
    values,
  } = useFormik<FormValues>({
    initialValues: command ?? emptyCommand,
    onSubmit: async (submittedValues) => {
      try {
        if (command?.id) {
          await commandUpdate({
            id: command.id,
            ...submittedValues,
            keywords: submittedValues.keywords.map(
              (keyword) => keyword.keyword
            ),
          });
        } else {
          await commandCreate({
            ...submittedValues,
            keywords: submittedValues.keywords.map(
              (keyword) => keyword.keyword
            ),
          });
        }
        onSuccess();
      } catch (error) {
        onError();
      }
    },
    validationSchema,
  });

  const keywordsHelperText = React.useMemo((): string | undefined => {
    const isString = (
      keywordsErrors: typeof errors.keywords
    ): keywordsErrors is string => typeof keywordsErrors === 'string';
    if (touched.keywords && errors.keywords) {
      return isString(errors.keywords)
        ? errors.keywords
        : errors.keywords.join(', ');
    }
    return undefined;
  }, [errors, touched]);

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardContent>
          <TextField
            error={Boolean(errors.name)}
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
            error={Boolean(errors.description)}
            fullWidth
            helperText={touched.description && errors.description}
            label="Description"
            margin="normal"
            multiline
            name="description"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.description}
          />
          <Autocomplete<CommandKeyword, true, undefined, true>
            freeSolo
            multiple
            onChange={(_, keywords) => {
              const commandKeywords = keywords.map<CommandKeyword>(
                (keyword, index) => ({
                  commandID: command?.id || 0,
                  id: 0,
                  isPrimary: index === 0,
                  keyword:
                    typeof keyword === 'string' ? keyword : keyword.keyword,
                })
              );
              setFieldValue('keywords', commandKeywords);
            }}
            options={[]}
            renderInput={(params) => (
              <TextField
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...params}
                error={Boolean(errors.keywords)}
                fullWidth
                helperText={keywordsHelperText}
                label="Keywords"
                margin="normal"
              />
            )}
            renderTags={(value, getTagProps) =>
              value.map((commandKeyword, index) => (
                <Chip
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...getTagProps({ index })}
                  label={commandKeyword.keyword}
                />
              ))
            }
            value={values.keywords}
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

export default CommandForm;
