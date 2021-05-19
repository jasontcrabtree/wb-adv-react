import { list } from '@keystone-next/keystone/schema';
import {
  text,
  checkbox,
  integer,
  select,
  relationship,
} from '@keystone-next/fields';

// Product Schema Est Setup
/*
Data Shape:
 - name
 - available
 - quantity
 - price
 - description
 - picture
*/

export const Product = list({
  // TODO Access
  // access
  // FIELDS
  fields: {
    name: text({ isRequired: true, isUnique: true, isIndexed: true }),
    description: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
    photo: relationship({
      ref: 'ProductImage.product',
      ui: {
        displayMode: 'cards',
        cardFields: ['image', 'altText'],
        inlineCreate: { fields: ['image', 'altText'] },
        inlineEdit: { fields: ['image', 'altText'] },
      },
    }),
    status: select({
      options: [
        { label: 'Draft', value: 'DRAFT' },
        { label: 'Available', value: 'AVAILABLE' },
        { label: 'Unavailable', value: 'UNAVAILABLE' },
      ],
      defaultValue: 'DRAFT',
      ui: {
        displayMode: 'segmented-control',
        // createView: { fieldMode: 'hidden' },
      },
    }),
    // available: checkbox({ defaultValue: false }), // - Jason's attempt

    // quantity: integer({ defaultValue: 0 }), // - Jason's attempt

    price: integer({ isRequired: true }),

    // TODO - Photo (relationship field)
    // picture: text({ isRequired: false }),
  },
});
