import { Avatar, Box, Typography, Divider, ImageListItem } from "@mui/material"

const ListTasks = () => {

  return (
    <>
      <Box
        display={'flex'}
        height={'100%'}
        flexDirection={'column'}>

        <ImageListItem
        sx={{
          width:'100%',
          height:'100%'}}>
          <img src='/static/images/task/list-task-cover.png' alt='ListTaskCover' width={'100%'} height={'100%'} />

        </ImageListItem>

        <Box
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          flexDirection={'column'}>
          <Avatar alt="AvatarTask" src="/static/images/task/list-task-avatar.png" sx={{ width: 197, height: 176}}/>
          <Typography>Ramon I426</Typography>
          <Typography >0xA6A8C3D15B0B...75fbC</Typography>
        </Box>

        <Box>
          <Typography> 🧑🏻‍💻Desenvolvedor e criador da startup Web3task </Typography>
          <Typography>  link:https://www.web3task.com.br</Typography>
          <Typography> Construtor na WEB3DEV🧪</Typography>

          <Divider />
        </Box>
        <Divider/>
      </Box>
    </>
  )
}

export default ListTasks