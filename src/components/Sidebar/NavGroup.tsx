import PropTypes from 'prop-types';
import { ListSubheader, styled } from '@mui/material';
import { IconDots } from '@tabler/icons-react'; 

const ListSubheaderStyle = styled((props) => <ListSubheader disableSticky {...props} />)(
  ({ theme }) => ({
    ...theme.typography.overline,
    fontWeight: '700',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(0),
    color: theme.palette.text.secondary,
    lineHeight: '26px',
    padding: '3px 12px',
  })
);

const NavGroup = ({ item, hideMenu }) => {
  return (
    <ListSubheaderStyle sx={{ marginLeft: hideMenu ? 0 : '-10px' }}>
      {hideMenu ? <IconDots size="14" /> : item.subheader}
    </ListSubheaderStyle>
  );
};

NavGroup.propTypes = {
  item: PropTypes.object.isRequired,
  hideMenu: PropTypes.bool,
};

export default NavGroup;
