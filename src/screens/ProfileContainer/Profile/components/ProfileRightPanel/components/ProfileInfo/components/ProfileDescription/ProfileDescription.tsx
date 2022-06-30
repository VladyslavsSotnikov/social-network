import { VFC } from 'react';

import { ContactsType, ProfileDataType } from '../../../../../../../../../models';
import { EditButton, ProfileDescriptionItem } from './components';

type PropTypes = {
  profile: ProfileDataType | null;
  isAuthorizedUser: boolean;
  openEditProfileDialog: () => void;
};

export const ProfileDescription: VFC<PropTypes> = ({ profile, isAuthorizedUser, openEditProfileDialog }) => {
  if (!profile) {
    return null;
  }

  return (
    <>
      {isAuthorizedUser && <EditButton openEditProfileDialog={openEditProfileDialog} />}
      <ul>
        <ProfileDescriptionItem title='Szykam pracy' item={profile.lookingForAJob} itemTrue='Tak' itemFalse='Nie' />
        <ProfileDescriptionItem
          title='Moje umiejętności'
          item={profile.lookingForAJobDescription}
          itemTrue={profile.lookingForAJobDescription}
          itemFalse='-'
        />

        {Object.keys(profile.contacts).map((contact) => {
          return (
            <ProfileDescriptionItem
              key={contact}
              title={contact}
              item={profile.contacts[contact as keyof ContactsType]}
              itemTrue={profile.contacts[contact as keyof ContactsType]}
              itemFalse='-'
            />
          );
        })}
      </ul>
    </>
  );
};
