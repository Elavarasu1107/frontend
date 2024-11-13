$(window).on('load', () => {
	const urlParams = new URLSearchParams(window.location.search)
	let id = urlParams.get('id')

	const $profileCtnRef = $('#profile-ctn')
	for (let prof of [1, 2, 3, 4]) {
		const $profileDiv = $('<label>', { class: 'flex gap-2' })

		const $radio = $('<input>', {
			type: 'radio',
			id: `profile${prof}`,
			name: `profile`,
			value: `/assets/Profile/profile${prof}.png`,
		})

		const $img = $('<img>', {
			src: `/assets/Profile/profile${prof}.png`,
			id: `image${prof}`,
			alt: `image${prof}`,
		})

		$profileDiv.append($radio, $img)
		$profileCtnRef.append($profileDiv)
	}

	const GENDER = ['Male', 'Female']
	const $genderCtnRef = $('#gender-ctn')
	for (let gen of GENDER) {
		const $genDiv = $('<label>', { class: 'flex gap-2' })

		const $radio = $('<input>', {
			type: 'radio',
			id: gen,
			name: 'gender',
			value: gen,
		})

		const $label = $('<label>', {
			for: gen,
			text: gen,
		})

		$genDiv.append($radio, $label)
		$genderCtnRef.append($genDiv)
	}

	const DEPARTMENTS = ['HR', 'Sales', 'Finance', 'Engineer', 'Others']
	const $deptCtnRef = $('#dept-ctn')
	for (let dept of DEPARTMENTS) {
		const $deptDiv = $('<div>', { class: 'flex gap-2' })

		const $checkbox = $('<input>', {
			class: 'checkbox',
			type: 'checkbox',
			id: dept,
			name: 'department',
			value: dept,
		})

		const $label = $('<label>', {
			for: dept,
			text: dept,
		})

		$deptDiv.append($checkbox, $label)
		$deptCtnRef.append($deptDiv)
	}

	const $yearCtnRef = $('#year')
	const $monthCtnRef = $('#month')
	const $dayCtnRef = $('#day')

	let today = new Date().toUTCString().split(' ')
	let year = parseInt(today[3])
	const MONTHS = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	]
	for (let i = year - 5; i <= year + 5; i++) {
		const $yearOpt = $('<option>', {
			value: i,
			text: i,
		})

		$yearCtnRef.append($yearOpt)
	}

	for (let mon of MONTHS) {
		const $monthOpt = $('<option>', {
			value: mon,
			text: mon,
		})

		$monthCtnRef.append($monthOpt)
	}

	const $monYearDiv = $('#month, #year')

	$monYearDiv.on('change', () => {
		let month = $('#month').val()
		let year = $('#year').val()

		if (month && year) {
			$dayCtnRef.children().not(':first').remove()
			let monthIndex = MONTHS.indexOf(month) + 1
			let days = new Date(parseInt(year), monthIndex, 0).getDate()

			let elements = Array.from({ length: days + 1 }, (_, i) => {
				return $('<option>', {
					value: i,
					text: i,
				})
			})

			$dayCtnRef.append(elements)
		}
	})

	const PROPS = {
		name: $('#name'),
		profile: $('[name="profile"]'),
		gender: $('[name="gender"]'),
		department: $('[name="department"]'),
		salary: $('#salary'),
		salaryOutput: $('#salary-output'),
		day: $('#day'),
		month: $('#month'),
		year: $('#year'),
		notes: $('#notes'),
	}

	const getNextKey = () => {
		let maxKey = 0

		for (let i = 0; i < localStorage.length; i++) {
			let key = localStorage.key(i)
			// Check if the key is a number
			if (!isNaN(key)) {
				maxKey = Math.max(maxKey, parseInt(key, 10))
			}
		}
		return maxKey + 1
	}

	// Adding a new item with the next key
	const addItemToLocalStorage = data => {
		if (id) {
			data['id'] = id
		} else {
			data['id'] = getNextKey()
		}
		let key = data['id']
		data = JSON.stringify(data)

		localStorage.setItem(key, data)
	}

	function resetValues() {
		// Reset text and number inputs
		PROPS.name.val('')
		PROPS.salary.val(50000)
		PROPS.salaryOutput.text('50000')
		PROPS.day.val('')
		PROPS.month.val('')
		PROPS.year.val('')
		PROPS.notes.val('')
		// Reset radio buttons (profile and gender)
		PROPS.profile.prop('checked', false)
		PROPS.gender.prop('checked', false)
		// Reset checkbox (department)
		PROPS.department.prop('checked', false)
	}

	const addEmployee = () => {
		const data = {}
		Object.entries(PROPS).forEach(([key, element]) => {
			let type = element.prop('type')
			if (type === 'radio') {
				data[key] = element.filter(':checked').val() || null
			} else if (type === 'checkbox') {
				data[key] = element
					.filter(':checked')
					.map((_, el) => el.value)
					.get()
			} else {
				data[key] = element.val()
			}
		})

		addItemToLocalStorage(data)
		resetValues()
	}

	PROPS.salary.on('input', e => {
		PROPS.salaryOutput.text(e.target.value)
	})

	if (id) {
		let existingData = localStorage.getItem(id)
		if (existingData) {
			existingData = JSON.parse(existingData)
		}

		Object.entries(PROPS).forEach(([key, element]) => {
			if (key != 'day') {
				if (element.is(':radio')) {
					element.filter(`[value="${existingData[key]}"]`).prop('checked', true)
				} else {
					element.val(existingData[key])
				}
			}
		})

		$monYearDiv.trigger('change')
		PROPS.day.val(existingData.day)
	}

	let submitBtnRef = document.getElementById('submit')
	submitBtnRef.addEventListener('click', e => {
		e.preventDefault()
		addEmployee()
	})

	// let resetBtnRef = document.getElementById('reset')
	// resetBtnRef.addEventListener('click', e => {
	// 	e.preventDefault()
	// 	resetValues()
	// })
})
