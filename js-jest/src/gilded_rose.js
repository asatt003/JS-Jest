class Item {
  constructor(name, sellBy, quality) {
    this.name = name;
    this.sellBy = sellBy;
    this.quality = quality;
    this.type = "";
  }

  assignItemType(name) {
    if (this.name === `Aged Brie`) {
      this.type = `Aged Brie`;
    } else if (this.name === `Backstage passes to a TAFKAL80ETC concert`) {
      this.type = `Backstage Pass`
    } else if (this.name === `Elixir of the Mongoose`) {
      this.type = `Conjured Item`
    } else if (this.name === `Sulfuras, Hand of Ragnaros`) {
      this.type = `Legendary Item`;
    }
  }

  decrementSellBy() {
    if (this.name != 'Sulfuras, Hand of Ragnaros') {
      this.sellBy -= 1;
    }
    return this.sellBy;
  }

  decreaseQuality(amount) {
    this.quality <= 0 ? 0 : this.quality -= amount;
  }

  increaseQuality(amount) {
    this.quality >= 50 ? 50 : this.quality += amount;
  }
};

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  newDay() {
    for (let i = 0; i < this.items.length; i++) {
      let itemSellBy = this.items[i].sellBy;
      let itemQuality = this.items[i].quality;
      const itemName = this.items[i].name;

      if (itemName != 'Aged Brie' && itemName != 'Backstage passes to a TAFKAL80ETC concert') {
        if (itemQuality > 0) {
          if (itemName != 'Sulfuras, Hand of Ragnaros') {
            itemQuality -= 1;
          }
        }
      } else {
        if (itemQuality < 50) {
          itemQuality += 1;
          if (itemName == 'Backstage passes to a TAFKAL80ETC concert') {
            if (itemSellBy < 11 && itemQuality < 50) {
                itemQuality += 1;
            }
            if (itemSellBy < 6 && itemQuality < 50) {
                itemQuality += 1;
            }
          }
        }
      }

      if (itemName != 'Sulfuras, Hand of Ragnaros') {
        itemSellBy -= 1;
      }
      if (itemSellBy < 0) {
        if (itemName != 'Aged Brie') {
          if (itemName != 'Backstage passes to a TAFKAL80ETC concert') {
            if (itemQuality > 0) {
              if (itemName != 'Sulfuras, Hand of Ragnaros') {
                itemQuality -= 1;
              }
            }
          } else {
            itemQuality = itemQuality - itemQuality;
          }
        } else {
          if (itemQuality < 50) {
            itemQuality += 1;
          }
        }
      }
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}

