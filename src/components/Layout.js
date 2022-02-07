import { makeStyles } from '@material-ui/core'
import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { AddCircleOutlineOutlined, SubjectOutlined } from '@material-ui/icons'
import { useNavigate, useLocation } from 'react-router'

const drawerWidth = 240

const useStyles = makeStyles({
    page: {
        background: '#f9f9f9',
        width: '100%'
    },
    drawer: {
        width: drawerWidth
    },
    drawerPaper: {
        width: drawerWidth
    },
    root: {
        display: 'flex'
    },
    active: {
        background: '#f4f4f4'
    }
})

export default function Layout({ children }) {
    const classes = useStyles()
    const navigate = useNavigate()
    const location = useLocation()

    const menuItems = [
        {
            text: 'Home',
            icon: <SubjectOutlined color='secondary' />,
            path: '/'
        },
        {
            text: 'Bears Factory',
            icon: <AddCircleOutlineOutlined color='secondary' />,
            path: '/bears-factory'
        }
    ]

    return (
        <div className={classes.root}>
            {/* app bar */}

            {/* side drawer */}
            <Drawer
                className={classes.drawer}
                variant='permanent'
                anchor='left'
                classes={{ paper: classes.drawerPaper }}
            >
                <div>
                    <Typography variant='h4'>
                        Crypto Bears
                    </Typography>
                </div>

                {/* list / links */}
                <List>
                    {menuItems.map(item => (
                        <ListItem 
                            button 
                            key={item.text}
                            onClick={() => navigate(item.path, { replace: true })}
                            className={location.pathname == item.path ? classes.active : null}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                </List>


            </Drawer>

            <div className={classes.page}>
                {children}
            </div>
        </div>
    )
}