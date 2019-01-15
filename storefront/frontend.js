ec.order = ec.order || {};
ec.order.extraFields = ec.order.extraFields || {};

// A text input that asks a buyer how to sign the package
ec.order.extraFields.wrapping_box_signature = {
  'title': 'How should we sign the package?',
  'textPlaceholder': 'Package sign',
  'type': 'text',
  'tip': 'We will put a label on a box so the recipient knows who it is from',
  'required': false,
  'checkoutDisplaySection': 'shipping_address'
};

// Dropdown that asks "How do you find us?"
ec.order.extraFields.how_do_you_find_us = {
  'title': '_msg_checkout.how_do_you_find_us',
  'type': 'select',
  'required': false,
  'selectOptions': ['Google Ads', 'Friend told me', 'TV show', 'Other'],
  'value': 'TV show', // Will be used the default value (if nothing is entered)
  'checkoutDisplaySection': 'order_comments'
};

// A custom hidden field (does not appear at checkout)
ec.order.extraFields.my_custom_field = {
  'value': 'abcd12345'
};

// A text field asking for instruction/notes for a courier. It's only displayed when the delivery option is chosen
ec.order.extraFields.courier_notes = {
  'title': 'Notes for the courier',
  'type': 'text',
  'checkoutDisplaySection': 'shipping_address',
  'available': false,
  'overrides': [
    {
      'conditions': {
        'shippingMethod': 'Express delivery'
      },
      'fieldsToOverride': {
        'available': true
      }
    }
  ]
};

// Order pickup date/time. Datepicker configuration depends on pickup point
ec.order.extraFields.ecwid_pickup_time = {
  'title': '_msg_ShippingDetails.pickup.customer_header',
  'required': true,
  'type': 'datetime',
  'checkoutDisplaySection': 'pickup_details',
  'orderDetailsDisplaySection': 'order_comments',
  'datePickerOptions': {
    minDate: new Date(new Date().getTime() + 2*60*60*1000), // Add order preparation (fulfillment) time
    maxDate: new Date(2020, 12, 31),
    showTime: true,
    autoClose: false,
    use24hour: true,
    incrementMinuteBy: 30,
    limitAvailableHoursWeekly: {
      'MON': [
        ['08:30', '13:30'],
        ['14:00', '17:30']
      ],
      'TUE': [
        ['14:00', '17:30']
      ],
      'WED': [
        ['01:00', '13:30']
      ],
      'THU': [
        ['14:00', '23:30']
      ],
      'FRI': [
        ['14:00', '17:30']
      ]
    }
  },

  'overrides': [
    {
      'conditions': {
        'shippingMethod': 'Pickup at North st'
      },
      'fieldsToOverride': {
        'datePickerOptions': {
          minDate: new Date(new Date().getTime() + 2*60*60*1000),
          maxDate: new Date(2020, 12, 31),
          showTime: true,
          autoClose: false,
          use24hour: true,
          incrementMinuteBy: 30,
          limitAvailableHoursWeekly: {
            'MON': [
              ['08:30', '13:30'],
              ['14:00', '17:30']
            ],
            'TUE': [
              ['14:00', '17:30']
            ]
          },

          // Disallow specific dates
          'disallowDates': [
            // Disallow same-day pickup after 3PM
            ['2017-04-25 15:00:00', '2017-04-25 23:59:59'],

            // Disallow specific time interval (e.g. if you're booked at that time)
            ['2017-04-26 08:30', '2017-04-26 10:00']
          ]
        }
      }
    },

    {
      'conditions': {
        'shippingMethod': 'Pickup at East st'
      },
      'fieldsToOverride': {
        'datePickerOptions': {
          minDate: new Date(new Date().getTime() + 2*60*60*1000),
          maxDate: new Date(2020, 12, 31),
          showTime: true,
          autoClose: false,
          use24hour: true,
          incrementMinuteBy: 30,
          limitAvailableHoursWeekly: {
            SAT: [
              ['08:30', '13:30'],
              ['14:00', '17:30']
            ],
            SUN: [
              ['14:00', '17:30']
            ]
          }
        }
      }
    },

    {
      'conditions': {
        'shippingMethod': 'Pickup at West st'
      },
      'fieldsToOverride': {
        'available': false
      }
    }
  ]
};

Ecwid.refreshConfig();
