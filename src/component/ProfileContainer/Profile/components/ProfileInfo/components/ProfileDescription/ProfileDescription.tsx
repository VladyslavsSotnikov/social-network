import { makeStyles } from '@mui/styles';
import { Fragment, VFC } from 'react';
import { ContactsType, ProfileDataType } from '../../../../../../../models';

type ProfileDescriptionProps = {
  profile: ProfileDataType | null;
  isAuthorizedUser: boolean;
  openEditProfileDialog: () => void;
};

const useStyles = makeStyles({
  aboutItem: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '15px',
  },

  aboutItemKey: {
    width: '100px',
    color: '#D5D5D6',
  },

  aboutItemValue: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: '300px',
    color: '#4A76A8',
    textAlign: 'right',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  buttonWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: '10px',
  },

  editButton: {
    width: '20%',
    padding: '8px 0',
    backgroundColor: '#5181B8',
    border: 'none',
    borderRadius: '2px',
    color: '#fff',
    marginBottom: '10px',

    '&:hover': {
      backgroundColor: '#6A98CC',
      cursor: 'pointer',
    },
  },
});

export const ProfileDescription: VFC<ProfileDescriptionProps> = ({
  profile,
  isAuthorizedUser,
  openEditProfileDialog,
}) => {
  const classes = useStyles();

  if (!profile) {
    return null;
  }

  return (
    <Fragment>
      <div className={classes.buttonWrapper}>
        {isAuthorizedUser && (
          <button onClick={openEditProfileDialog} className={classes.editButton}>
            Edytuj
          </button>
        )}
      </div>

      <ul>
        <li className={classes.aboutItem}>
          <p className={classes.aboutItemKey}>O mnie:</p>
          {/* <span className="profile__about-span">{profile.aboutMe ? profile.aboutMe : '-'}</span> */}
        </li>

        <li className={classes.aboutItem}>
          <p className={classes.aboutItemKey}>Szukam pracy:</p>
          <span className={classes.aboutItemValue}>{profile.lookingForAJob ? 'Tak' : 'Nie'}</span>
        </li>

        <li className={classes.aboutItem}>
          <p className={classes.aboutItemKey}>Moje umiejętności:</p>
          <span className={classes.aboutItemValue}>
            {profile.lookingForAJobDescription ? profile.lookingForAJobDescription : '-'}
          </span>
        </li>
        {Object.keys(profile.contacts).map((contact) => {
          return (
            <li key={contact} className={classes.aboutItem}>
              <p className={classes.aboutItemKey}>{contact}: </p>
              <span className={classes.aboutItemValue}>
                {profile.contacts[contact as keyof ContactsType]
                  ? profile.contacts[contact as keyof ContactsType]
                  : '-'}
              </span>
            </li>
          );
        })}
      </ul>
    </Fragment>
  );
};
