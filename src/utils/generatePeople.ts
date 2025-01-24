const nameSuffix = ["ahmed", "hossain", "hasan", "lopez", "bari", "akter", "chowdhury", "sen", "mollick"]
const namePrefix = ["faisal", "fakir", "janifer", "cristopher", "tausif", "susmita", "momtaz", "koyel", "dipu"]
const mailSyntax = ["gmail", "yahoo", "outlook", "hotmail"]
const locations = ['dhaka', 'khulna', 'lithunia']
const possibleTags = ["Customers", "VIP", "CIP", "Agent", "Bankers", 'Lecturers', 'Teachers', 'Engineers', 'Doctors']

export function generatePeople(count: number) {
  const peopleTable = []

  // Track used potato counts if you want them unique
  const usedPotatoCounts = new Set<number>()

  for (let i = 0; i < count; i++) {
    // Pick a random first name & last name
    const firstName = namePrefix[Math.floor(Math.random() * namePrefix.length)]
    const lastName = nameSuffix[Math.floor(Math.random() * nameSuffix.length)]

    // Build a random email
    const domain = mailSyntax[Math.floor(Math.random() * mailSyntax.length)]
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}.com`

    // Combine for a full display name
    const fullName = `${firstName} ${lastName}`

    // Generate a unique potatoes count (from 1..99)
    let potatoes
    do {
      potatoes = Math.floor(Math.random() * count) + 1
    } while (usedPotatoCounts.has(potatoes))
    usedPotatoCounts.add(potatoes)

    // Random location
    const location = locations[Math.floor(Math.random() * locations.length)]

    // Random tags: pick 0..X tags from `possibleTags`
    const chosenTags: string[] = []
    const numberOfTags = Math.floor(Math.random() * 5) // up to 5 tags, for example
    for (let t = 0; t < numberOfTags; t++) {
      const randomTag = possibleTags[Math.floor(Math.random() * possibleTags.length)]
      if (!chosenTags.includes(randomTag)) {
        chosenTags.push(randomTag)
      }
    }

    // Push the random record
    peopleTable.push({
      email,
      name: fullName,
      potatoes,
      tags: chosenTags,
      location
    })
  }

  return peopleTable
}
