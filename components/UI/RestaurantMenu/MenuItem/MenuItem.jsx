import { Typography } from "@mui/material";
import styled from "@emotion/styled";
import GlutenFreeIcon from "../../Icons/GlutenFreeIcon";
import VeganIcon from "../../Icons/VeganIcon";
import VegetarianIcon from "../../Icons/VegetarianIcon";
import DairyFreeIcon from "../../Icons/DariyFreeIcon";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

function MenuItem({
  dishName,
  dishDescription,
  dishPrice,
  condition,
  dietaryInformation,
}) {

  const dietaryIcons = dietaryInformation.map((item,index)=>{ 
    if(item.value==='vegetarian'){ 
      return  <Tooltip title="Vegetarian" arrow key={index}>
      <Button>
        <VegetarianIcon className="inline-block" />

      </Button>
    </Tooltip>
    }
    if(item.value==="vegan"){ 
      return  <Tooltip title="Vegan" arrow key={index}>
                  <Button>
                    <VeganIcon className="inline-block" />
                  </Button>
                </Tooltip>
    }
    if(item.value==="glutenFree"){ 
      return  <Tooltip title="Gluten Free" arrow key={index}>
      <Button>
        <GlutenFreeIcon className="inline-block" />
      </Button>
    </Tooltip>
    }
    if(item.value==="dairyFree"){ 
      return  <Tooltip title="Dairy Free" arrow key={index}>
      <Button>
        <DairyFreeIcon className="inline-block" />
      </Button>
    </Tooltip>
    }
  })

  // console.log(dietaryInformation);

  // console.log(glutenFree, vegetarian, vegan, dairyFree);
  return (
    <Container className="menu-item ">
      <div className="dish-wrapper">
        <div className="dish-name-wrapper">
          <Typography className="dish-name" variant="h6" component="h3">
            {dishName}
            <span className="icon-wrapper">
             {dietaryIcons}
            </span>
          </Typography>
          {condition && (
            <Typography variant="body2" component="div">
              *{condition}
            </Typography>
          )}
        </div>
        {dishPrice && 
         <Typography variant="subtitle1" component="div" className="dish-price">
         ${dishPrice}
       </Typography>
        }
       
      </div>
      {dishDescription && 
      <>
     
      {/* set html dangerously  */}
      <div className="body1"  dangerouslySetInnerHTML={{ __html: dishDescription }}
      />
      <div className="dish-border mt-16"></div>
      </>
      }
    
    </Container>
  );
}

export default MenuItem;

const Container = styled.li`
  .dish-wrapper {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: 16px;
    justify-content: space-between;
    .dish-name {
      display: flex;
      align-items: center;
      gap: 8px; 
      .icon-wrapper{ 
      position:relative; 
      top: -2px; 
      }
      @media (max-width: 640px) {
        flex-direction: column;
        align-items: flex-start;
      }
    
      button {
        display: inline-block;
        padding: 0 8px !important;
        height: 16px !important;
        font-size: 0;
        line-height: 0;
        min-width: 16px;
        svg {
          margin-left: 4px;
          width: 16px;
          height: 16px;
          path {
            fill: var(--dark-on-surface);
          }
        }
      }
    }
  }
  .description {
    width: 80%;
  }
  .dish-border {
    border-bottom: 1px solid var(--dark-outline);
    opacity: 0.6;
  }
`;

