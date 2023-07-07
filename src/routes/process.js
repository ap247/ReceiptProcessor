const express = require('express');
const router = express.Router();
var { nanoid } = require("nanoid");

router.use(express.json());

router.use(express.urlencoded({ extended: true }));

router.post('/process', (req, res) => {
    // Get all users logic
    const receiptData = req.body;
    points = 0;
    for (var receiptCategory in receiptData) {
        if(receiptCategory === "retailer") {
            const receiptVal = receiptData[receiptCategory];
            var numAlphanumeric = 0;
            for(let i = 0; i < receiptVal.length; i++) {
                if(isAlphanumeric(receiptVal.charAt(i))) {
                    numAlphanumeric++;
                }
            }
            points += numAlphanumeric;
        } else if(receiptCategory === "purchaseDate") {
            const dateOfMonth = parseInt(receiptData[receiptCategory].slice(-2));
            if(dateOfMonth % 2 == 1) {
                points+= 6;
            } 
        } else if(receiptCategory === "purchaseTime") {
            const hour = parseInt(receiptData[receiptCategory].slice(0, 2));
            const min = parseInt(receiptData[receiptCategory].slice(3, 5));
            if(hour == 15 || (hour == 14 && min > 0)) {
                points+= 10;
            } 
        } else if(receiptCategory === "items") {
            const itemList = receiptData[receiptCategory]
            const len = itemList.length;
            points += Math.trunc(len / 2) * 5 ;
            for(let i = 0; i < len; i++) {
                const item = itemList[i];
                const trimDesc = item["shortDescription"].trim();
                if(trimDesc.length % 3 == 0) {
                    points += Math.ceil(parseInt(item["price"]) * 0.2 );
                }
            }
        } else if(receiptCategory === "total") {
            const total = parseFloat(receiptData[receiptCategory]);
            if(total % 1 === 0) {
                points += 50;
            }
            if(total % 0.25 === 0) {
                points += 25;
            }
        }
    }
    const id = nanoid();
    req.session.receiptPoints[id] = points;
    res.send(id);

});
  
function isAlphanumeric(ch) {
    return /^[a-zA-Z0-9]+$/.test(ch);
}

module.exports = router;