import React from 'react';
import ChronicleCard from 'components/ChronicleCard';
import LazyLoad from 'react-lazyload';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const ChronicleContentList = (props) => {
   // only chronicle items that have been 'published'
   let publishedItems = props.memorial.items.filter(itm => itm.published === "true");
   let born = parseInt(props.memorial.born.split(/[^\d]/).find((n) => n.length === 4));
   // list of years (birth - present)
   let years = Array.from(new Array(new Date().getFullYear() - born + 1), (x, i) => i + born);
   // concat
   let contentList = years.concat(publishedItems);
   // console.log(contentList);
   // sort by date, earliest first

   // let sorted = contentList.sort(
   //    (a, b) => (isNaN(a) ? (a.date.split(/[^\d]/).find((n) => n.length === 4)) : a) - (isNaN(b) ? (b.date.split(/[^\d]/).find((n) => n.length === 4)) : b)
   // );

   const dateObjFromStr = (string) => {
      let str = string.split(', ');
      switch (str.length) {
         case 1:  // year only, e.g. "~1992"
            // create Date obj from year, e.g. new Date("1992")
            return new Date(str[0].split(/[^\d]/).find((n) => n.length === 4), 0, 1, 2);
            break;
         case 2: // month || month/day || season || holiday
            let str1 = str[0].split(' ');
            switch (str1.length) {
               case 1:
                  // date from month, season or holiday
                  return dateObjFromMonthSeasonHoliday(str);
                  break;
               case 2:
                  // could be exact date (e.g. "January 12, 1982") or multi-word holiday (e.g. "Mother's Day")
                  let day = parseInt(str1[1]);
                  // console.log(day);
                  // if exact date
                  if (!isNaN(day)) {
                     return new Date(string);
                  } else {
                  // else holiday
                  return dateObjFromMonthSeasonHoliday(str);
                  }
                  break;
               default: 
                  return dateObjFromMonthSeasonHoliday(str);
            }
            break;
      }
   }

   const dateObjFromMonthSeasonHoliday = (arr) => {
      // console.log(arr);
      switch (arr[0]) {
         // months
         case "January":
            return new Date(arr[1], 0);
            break;
         case "February":
            return new Date(arr[1], 1);
            break;
         case "March":
            return new Date(arr[1], 2);
            break;
         case "April":
            return new Date(arr[1], 3);
            break;
         case "May":
            return new Date(arr[1], 4);
            break;
         case "June":
            return new Date(arr[1], 5);
            break;
         case "July":
            return new Date(arr[1], 6);
            break;
         case "August":
            return new Date(arr[1], 7);
            break;
         case "September":
            return new Date(arr[1], 8);
            break;
         case "October":
            return new Date(arr[1], 9);
            break;
         case "November":
            return new Date(arr[1], 10);
            break;
         case "December":
            return new Date(arr[1], 11);
            break;
         // seasons
         case "Winter":
            return new Date(arr[1], 1, 1);
            break;
         case "Spring":
            return new Date(arr[1], 2, 20);
            break;
         case "Summer":
            return new Date(arr[1], 5, 20);
            break;
         case "Autumn":
            return new Date(arr[1], 8, 22);
            break;
         // holidays
         case "New Year's Day":
            return new Date(arr[1], 0, 1, 1);
            break;
         case "Easter":
            return new Date(arr[1], 3, 5);
         case "Mother's Day":
            return new Date(arr[1], 4, 11);
            break;
         case "Memorial Day":
            return new Date(arr[1], 4, 28);
            break;
         case "Father's Day":
            return new Date(arr[1], 5, 18);
            break;
         case "Fourth of July":
            return new Date(arr[1], 6, 4);
            break;
         case "Halloween":
            return new Date(arr[1], 9, 31);
            break;
         case "Thanksgiving":
            return new Date(arr[1], 10, 25);
            break;
         case "Christmas":
            return new Date(arr[1], 11, 25);
            break;
         // unknown -> today's date (placed at bottom of chronicle)
         default:
            return new Date();
      }
   }

   let sorted = contentList.sort(
      (a, b) => {
         return (isNaN(a) ? dateObjFromStr(a.date) : new Date(a, 0)) > (isNaN(b) ? dateObjFromStr(b.date) : new Date(b, 0));
      }
   );

   let dat = "~1992";
   let dat2 = "January, 1993";
   let dat3 = "January 24, 1989";
   let dat4 = "Christmas, 2006";
   let dat5 = "Mother's Day, 2012";
   let dat6 = "Father's Day, 1956";
   let dat7 = "Fourth of July, 1998";
   let dat8 = "Easter, 1992";
   let dat9 = "Thanksgiving, 1973";
   let dat10 = "New Year's Day, 1977";
   let dat11 = "November, 1938";


   console.log(dat, dateObjFromStr(dat));
   console.log(dat2, dateObjFromStr(dat2));
   console.log(dat3, dateObjFromStr(dat3));
   console.log(dat4, dateObjFromStr(dat4));
   console.log(dat5, dateObjFromStr(dat5));
   console.log(dat6, dateObjFromStr(dat6));
   console.log(dat7, dateObjFromStr(dat7));
   console.log(dat8, dateObjFromStr(dat8));
   console.log(dat9, dateObjFromStr(dat9));
   console.log(dat11, dateObjFromStr(dat11));

   // console.log("sorted: ", sorted);
   return (
      <div style={{marginTop: 16}}>
         {sorted.map((item, i) => (
            isNaN(item) ?
               <LazyLoad 
                  key={i}
                  height={200}
                  offset={600}
                  once
               >
                  <ChronicleCard
                     item={item}
                     memorialId={props.memorial.id}
                     born={props.memorial.born.split(/[^\d]/).find((n) => n.length === 4)}
                     died={props.memorial.died ? props.memorial.died.split(/[^\d]/).find((n) => n.length === 4) : new Date().getFullYear()}
                  />
               </LazyLoad>
               :
               <div
                  key={i}
                  style={{
                     display: 'flex',
                     alignItems: 'center',
                     margin: '2px 16px'
                  }}
               >
                  <Typography variant="caption">
                     {item}
                  </Typography>
                  <div
                     style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        marginLeft: 8
                     }}
                  >
                     <Divider />
                     <Divider />
                     <Divider />
                  </div>
               </div>
   ))}
      </div>
   )
}

export default ChronicleContentList;
