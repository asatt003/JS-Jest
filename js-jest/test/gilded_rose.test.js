const { Item, Shop } = require("../src/gilded_rose.js");

describe("Gilded Rose Pin Down Tests", () => {
  describe("Common Items", () => {
    test("Common items should degrade in quality by 1 each day and twice as fast, after sellBy date passed", () => {
      let commonItem = new Item("+5 Dexterity Vest", 0, 4); //build
      const gildedRose = new Shop([commonItem]);
  
      const items = gildedRose.newDay(); //operate

      expect(items[0].sellBy).toBe(-1); //check
      expect(items[0].quality).toBe(2);
    });

    test("Common item quality cannot be negative", () => {
      let commonItem = new Item("+5 Dexterity Vest", 10, 0); //build
      const gildedRose = new Shop([commonItem]);

      const items = gildedRose.newDay(); //operate

      expect(items[0].sellBy).toBe(9); //check
      expect(items[0].quality).toBe(0);
    });

    test("Common item quality cannot be greater than 50", () => {
      let commonItem = new Item("Aged Brie", 5, 50); //build
      const gildedRose = new Shop([commonItem]);

      const items = gildedRose.newDay(); //operate

      expect(items[0].sellBy).toBe(4); //check
      expect(items[0].quality).toBe(50);
    });
  });
  
  describe("Aged Brie", () => {
    test('Quality of "Aged Brie" should increase by 1 each day', () => {
      let agedBrie = new Item("Aged Brie", 10, 20); //build
      const gildedRose = new Shop([agedBrie]);
  
      const items = gildedRose.newDay(); //operate
  
      expect(items[0].quality).toBe(21); //check
    });
  });

  describe("Sulfuras, Hand of Ragnaros", () => {
    test('Sulfuras, being a legendary item, never has to be sold or decreases in Quality', () => {
      let sulfuras = new Item("Sulfuras, Hand of Ragnaros", 25, 50); //build
      const gildedRose = new Shop([sulfuras]);
  
      const items = gildedRose.newDay(); //operate
      
      expect(items[0].sellBy).toBe(25); //check
      expect(items[0].quality).toBe(50);
    });
  });

  describe("Backstage Passes", () => {
    test("Backstage passes increases in Quality as its SellBy value approaches", () => {
      let backstagePass = new Item("Backstage passes to a TAFKAL80ETC concert", 15, 25); //build
      const gildedRose = new Shop([backstagePass]);
  
      const items = gildedRose.newDay(); //operate

      expect(items[0].sellBy).toBe(14); //check
      expect(items[0].quality).toBe(26);
    });
    
    test('Quality of "Backstage passes" should increase by 2 when there are 10 days or less', () => {
      let backstagePass = new Item("Backstage passes to a TAFKAL80ETC concert", 10, 2); //build
      const gildedRose = new Shop([backstagePass]);

      const items = gildedRose.newDay(); //operate

      expect(items[0].sellBy).toBe(9); //check
      expect(items[0].quality).toBe(4);
    });
    
    test('Quality of "Backstage passes" should increase by 3 when there are 5 days or less', () => {
      let backstagePass = new Item(
        "Backstage passes to a TAFKAL80ETC concert", 5, 20); //build
      const gildedRose = new Shop([backstagePass]);

      const items = gildedRose.newDay(); //operate

      expect(items[0].sellBy).toBe(4); //check
      expect(items[0].quality).toBe(23);
    });

    test('Quality of "Backstage passes" should drop to 0 after concert occurs', () => {
      let backstagePass = new Item(
        "Backstage passes to a TAFKAL80ETC concert", 0, 40 ); //build
      const gildedRose = new Shop([backstagePass]);

      const items = gildedRose.newDay(); //operate

      expect(items[0].sellBy).toBe(-1); //check
      expect(items[0].quality).toBe(0);
    });
  });
  
  describe("Conjured Items", () => {
    test("Conjured Items degrade in Quality twice as fast as normal items", () => {
      let conjuredItem = new Item("Conjured Mana Cake", 3, 8); //build
      const gildedRose = new Shop([conjuredItem]);
  
      const items = gildedRose.newDay(); //operate
  
      expect(items[0].sellBy).toBe(2); //check
      expect(items[0].quality).toBe(6);
    });
  });
});
