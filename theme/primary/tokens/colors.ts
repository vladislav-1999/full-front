export const colors = {
	darkCyan: {
		light: { value: '#038681' },
		dark: { value: '#038681' },
	},

	status: {
		success: {
			light: { value: '#44B444' },
			dark: { value: '#1C6B1C' },
		},
		error: {
			light: { value: '#F34C3F' },
			dark: { value: '#F34C3F' },
		},
		warning: {
			light: { value: '#E57321' },
			dark: { value: '#E57321' },
		},
	},

	mistyRose: {
		light: { value: '#F3DCE7' },
		dark: { value: '#F3DCE7' },
	},

	tiffanyBlue: {
		light: { value: '#92DAD9' },
		dark: { value: '#92DAD9' },
	},

	spaceCadet: {
		light: { value: '#2A3043' },
		dark: { value: '#BBC0CF' },
	},

	vermillion: {
		light: { value: '#F34C3F' },
		dark: { value: '#F34C3F' },
	},

	white: {
		light: { value: '#FFFFFF' },
		dark: { value: '#FFFFFF' },
	},

	grey: {
		light: { value: '#727686' },
		dark: { value: '#9597A2' },
	},

	bg: {
		primary: {
			light: { value: '#FFFFFF' },
			dark: { value: '#FFFFFF' },
		},
		secondary: {
			light: { value: '#F8F8F8' },
			dark: { value: '#F8F8F8' },
		},
		tertiary: {
			light: { value: '#EAEAEA' },
			dark: { value: '#EAEAEA' },
		},
	},

	text: {
		primary: {
			light: { value: '#2A3043' },
			dark: { value: '#2A3043' },
		},
		secondary: {
			light: { value: '#727686' },
			dark: { value: '#727686' },
		},
	},

	fills: {
		secondary: {
			light: { value: '#787880' },
			dark: { value: '#787880' },
		},
	},
}

export const semanticColors = {
	text: {
		primary: {
			value: { _light: '{colors.text.primary.light}', _dark: '{colors.text.primary.dark}' },
		},
		secondary: {
			value: { _light: '{colors.text.secondary.light}', _dark: '{colors.text.secondary.dark}' },
		},
		tertiary: {
			value: { _light: '{colors.darkCyan.light}', _dark: '{colors.darkCyan.dark}' },
		},
		quaternary: {
			value: { _light: '{colors.white.light}', _dark: '{colors.white.dark}' },
		},
		error: {
			value: { _light: '{colors.status.error.light}', _dark: '{colors.status.error.dark}' },
		},
	},
	background: {
		primary: {
			value: { _light: '{colors.bg.primary.light}', _dark: '{colors.bg.primary.dark}' },
		},
		secondary: {
			value: { _light: '{colors.bg.secondary.light}', _dark: '{colors.bg.secondary.dark}' },
		},
		tertiary: {
			value: { _light: '{colors.status.warning.light}', _dark: '{colors.status.warning.dark}' },
		},
		quaternary: {
			value: { _light: '{colors.spaceCadet.light}', _dark: '{colors.spaceCadet.dark}' },
		},
	},
	button: {
		primary: {
			default: {
				bg: { value: { _light: '{colors.darkCyan.light}', _dark: '{colors.darkCyan.dark}' } },
				fg: { value: { _light: '{colors.white.light}', _dark: '{colors.white.dark}' } },
			},
		},
		secondary: {
			default: {
				bg: { value: { _light: '{colors.darkCyan.light/20}', _dark: '{colors.darkCyan.dark/20}' } },
				fg: { value: { _light: '{colors.darkCyan.light}', _dark: '{colors.darkCyan.dark}' } },
			},
		},
		tertiary: {
			default: {
				bg: { value: { _light: '{colors.bg.tertiary.light}', _dark: '{colors.bg.tertiary.dark}' } },
				fg: { value: { _light: '{colors.darkCyan.light}', _dark: '{colors.darkCyan.dark}' } },
			},
		},
		text: {
			default: {
				bg: { value: { _light: 'transparent', _dark: 'transparent' } },
				fg: { value: { _light: '{colors.spaceCadet.light}', _dark: '{colors.spaceCadet.dark}' } },
			},
		},
		quinary: {
			default: {
				bg: { value: { _light: '{colors.mistyRose.light}', _dark: '{colors.mistyRose.dark}' } },
				fg: { value: { _light: '{colors.darkCyan.light}', _dark: '{colors.darkCyan.dark}' } },
			},
		},
	},
	icon: {
		primary: {
			default: {
				bg: { value: { _light: '{colors.text.secondary.light}', _dark: '{colors.text.secondary.dark}' } },
			},
		},
		secondary: {
			default: {
				bg: { value: { _light: '{colors.darkCyan.light}', _dark: '{colors.darkCyan.dark}' } },
			},
		},
	},
	alert: {
		error: {
			bg: { value: { _light: '{colors.status.error.light}', _dark: '{colors.status.error.dark}' } },
		},
		warning: {
			bg: { value: { _light: '{colors.status.warning.light}', _dark: '{colors.status.warning.dark}' } },
		},
		success: {
			bg: { value: { _light: '{colors.status.success.light}', _dark: '{colors.status.success.dark}' } },
		},
		default: {
			bg: { value: { _light: '{colors.text.secondary.light}', _dark: '{colors.text.secondary.dark}' } },
		},
	},
	radio: {
		bg: { value: { _light: '{colors.bg.secondary.light}', _dark: '{colors.bg.secondary.dark}' } },
		border: { value: { _light: '{colors.bg.tertiary.light}', _dark: '{colors.bg.tertiary.dark}' } },
		dot: { value: { _light: '{colors.darkCyan.light}', _dark: '{colors.darkCyan.dark}' } },
	},
	toggle: {
		default: {
			bg: {
				value: { _light: '{colors.fills.secondary.light}', _dark: '{colors.fills.secondary.dark}' },
			},
			thumb: {
				value: { _light: '{colors.white.light}', _dark: '{colors.white.dark}' },
			},
		},
		active: {
			bg: {
				value: { _light: '{colors.darkCyan.light}', _dark: '{colors.darkCyan.dark}' },
			},
			thumb: {
				value: { _light: '{colors.white.light}', _dark: '{colors.white.dark}' },
			},
		},
		avatar: {
			bg: { value: { _light: '{colors.mistyRose.light}', _dark: '{colors.mistyRose.dark}' } },
			fg: { value: { _light: '{colors.darkCyan.light}', _dark: '{colors.darkCyan.dark}' } },
		},
	},
}
