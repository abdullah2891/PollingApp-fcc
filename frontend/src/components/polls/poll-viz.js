import React from 'react';
import {
  PieChart, Pie, Legend, Tooltip,
} from 'recharts';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  card: {
    width: "35vw",
    height: "95%"
  }
}


function PollViz(props){
  const {data, classes , dataKey, nameKey} = props;

  return(
      <Card className={classes.card}>
        <CardContent>
           <PieChart width={400} height={400}>
              <Pie dataKey={dataKey} nameKey={nameKey}  isAnimationActive={false} data={data} cx={200} cy={200} outerRadius={80} fill="#8884d8" label />
            <Tooltip />
          </PieChart>   
        </CardContent>
      </Card>
  )
}



export default withStyles(styles)(PollViz);
