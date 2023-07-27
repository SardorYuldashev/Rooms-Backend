/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async function(knex) {
  await knex('rooms').del()
  await knex('rooms').insert([
    {
      // id: 1,
      name: 'Facebook',
      floor: 2,
      for_stuff: false
    },
    {
      // id: 2,
      name: 'YouTube',
      floor: 2,
      for_stuff: false
    },
    {
      // id: 3,
      name: "O'quv bo'limi",
      floor: 2,
      for_stuff: true
    },
    {
      // id: 4,
      name: "Adobe",
      floor: 2,
      for_stuff: false
    },
    {
      // id: 5,
      name: "Microsoft",
      floor: 3,
      for_stuff: false
    },
    {
      // id: 6,
      name: "Manaviyat va marifat",
      floor: 3,
      for_stuff: true
    },
    {
      // id: 7,
      name: "Osmondagi bolalar",
      floor: 2,
      for_stuff: false
    },
    {
      // id: 8,
      name: "Media bo'limi",
      floor: 3,
      for_stuff: true
    },
    {
      // id: 9,
      name: "Twitter",
      floor: 3,
      for_stuff: false
    },
    {
      // id: 10,
      name: "MFaktor",
      floor: 2,
      for_stuff: false
    },
    
  ]);
};