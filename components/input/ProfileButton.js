import { Icon, Button, PopupTrigger, Popup, Menu, Item, Text } from 'react-basics';
import { useRouter } from 'next/router';
import Icons from 'components/icons';
import useMessages from 'hooks/useMessages';
import useUser from 'hooks/useUser';
import useConfig from 'hooks/useConfig';
import styles from './ProfileButton.module.css';
import useLocale from 'hooks/useLocale';

export default function ProfileButton() {
  const { formatMessage, labels } = useMessages();
  const { user } = useUser();
  const { cloudMode } = useConfig();
  const router = useRouter();
  const { dir } = useLocale();

  const handleSelect = key => {
    if (key === 'profile') {
      router.push('/settings/profile');
    }
    if (key === 'logout') {
      router.push('/logout');
    }
  };

  return (
    <PopupTrigger>
      <Button variant="quiet">
        <Icon>
          <Icons.Profile />
        </Icon>
        <Icon size="sm">
          <Icons.ChevronDown />
        </Icon>
      </Button>
      <Popup position="bottom" alignment={dir === 'rtl' ? 'start' : 'end'}>
        <Menu variant="popup" onSelect={handleSelect} className={styles.menu}>
          <Item key="user" className={styles.item}>
            <Text>{user.username}</Text>
          </Item>
          <Item key="profile" className={styles.item} divider={true}>
            <Icon>
              <Icons.User />
            </Icon>
            <Text>{formatMessage(labels.profile)}</Text>
          </Item>
          {!cloudMode && (
            <Item key="logout" className={styles.item}>
              <Icon>
                <Icons.Logout />
              </Icon>
              <Text>{formatMessage(labels.logout)}</Text>
            </Item>
          )}
        </Menu>
      </Popup>
    </PopupTrigger>
  );
}
