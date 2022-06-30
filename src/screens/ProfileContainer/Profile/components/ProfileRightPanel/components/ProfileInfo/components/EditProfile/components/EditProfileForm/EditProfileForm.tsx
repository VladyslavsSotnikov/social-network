import { VFC } from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { makeStyles } from '@mui/styles';

import { ProfileDataType } from '../../../../../../../../../../../models';
import { required } from '../../../../../../../../../../../helpers/validators';

import { EditProfileCheckBox, EditProfileInput } from './components';

type EditProfileFormProps = {
  profile: ProfileDataType | null;
};

const useStyle = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 15,
    width: '95%',
    height: '450px',
    overflowY: 'scroll',
    margin: '0 auto',

    '&::-webkit-scrollbar': {
      width: '0.4em',
    },

    '&::-webkit-scrollbar-thumb': {
      borderRadius: '20px',
      backgroundColor: 'rgba(0,0,0,.2)',
    },
  },

  buttonWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10px',
  },

  button: {
    width: '20%',
    padding: '8px 0',
    backgroundColor: '#5181B8',
    border: 'none',
    borderRadius: ' 2px',
    color: '#fff',
    marginBottom: '10px',

    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#6A98CC',
    },
  },
});

const Form: VFC<InjectedFormProps<ProfileDataType, EditProfileFormProps> & EditProfileFormProps> = ({
  profile,
  handleSubmit,
}) => {
  const classes = useStyle();
  return (
    <form onSubmit={handleSubmit}>
      <div className={classes.container}>
        <Field
          component={EditProfileInput}
          name='fullName'
          type='text'
          validate={[required]}
          placeholder='Imię oraz nazwisko'
        />
        <Field component={EditProfileInput} name='aboutMe' type='text' validate={[required]} placeholder='O mnie' />
        <Field component={EditProfileCheckBox} name='lookingForAJob' type='checkbox' />
        <Field
          component={EditProfileInput}
          name='lookingForAJobDescription'
          type='text'
          validate={[required]}
          placeholder='Twoje umiejętności'
        />
        {profile &&
          Object.keys(profile.contacts).map((contact) => {
            return (
              <Field
                key={contact}
                component={EditProfileInput}
                name={`contacts.${contact}`}
                type='text'
                placeholder={`Link do ${contact}`}
              />
            );
          })}
      </div>
      <div className={classes.buttonWrapper}>
        <button className={classes.button}>Zapisz</button>
      </div>
    </form>
  );
};

export const EditProfileForm = reduxForm<ProfileDataType, EditProfileFormProps>({ form: 'edit-form' })(Form);
