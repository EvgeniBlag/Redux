
import { AppBar, Button, IconButton, Toolbar, Typography  } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

export const HeaderBar = () => {
    const classes = useStyles();
    return(
      <div className={classes.root}> 
        <AppBar position="static">
        <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
               <h3 style={{color:"red",fontFamily:"Splash"}}> Todo List Project</h3>
            </Typography>
            <Button color="inherit">Login</Button>
        </Toolbar>
    </AppBar> 
    </div>
    )
}