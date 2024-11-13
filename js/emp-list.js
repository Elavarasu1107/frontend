const empList = []
let empListLength = localStorage.length

for (let i = 0; i < empListLength; i++) {
	let key = localStorage.key(i)
	emp = JSON.parse(localStorage.getItem(key))
	empList.push(emp)
}

const deleteEmp = id => {
	$(`#row-${id}`).remove()
	localStorage.removeItem(id)
}

const $tableBodyRef = $('#rows')

for (let i = 0; i < empListLength; i++) {
	const emp = empList[i]
	const $rowRef = $('<tr>', {
		class: 'bg-white',
		id: `row-${emp.id}`,
	})

	let $tdProfile = $('<td>')

	const $profileDivRef = $('<div>', {
		class: 'flex justify-center items-center',
	})

	const $profileRef = $('<img>', {
		src: emp.profile,
		alt: 'emp',
	})

	$profileDivRef.append($profileRef)
	$tdProfile.append($profileDivRef)
	$rowRef.append($tdProfile)

	let $tdNameRef = $('<td>')

	const $nameDivRef = $('<div>', {
		class: 'flex items-center justify-start',
	})

	const $nameSpanRef = $('<span>', {
		text: emp.name,
	})

	$nameDivRef.append($nameSpanRef)
	$tdNameRef.append($nameDivRef)
	$rowRef.append($tdNameRef)

	let $tdGenderRef = $('<td>')

	const $genderDivRef = $('<div>', {
		class: 'flex items-center justify-self-center',
	})

	const $genderSpanRef = $('<span>', {
		text: emp.gender,
	})

	$genderDivRef.append($genderSpanRef)
	$tdGenderRef.append($genderDivRef)
	$rowRef.append($tdGenderRef)

	let $tdDeptRef = $('<td>')

	const $deptDivListRef = $('<div>', {
		class: 'flex gap-4 justify-center',
	})

	for (let i = 0; i < emp.department.length; i++) {
		const $deptDivRef = $('<div>', {
			class: 'w-fit px-2 rounded-xl bg-lime-200',
			text: emp.department[i],
		})
		$deptDivListRef.append($deptDivRef)
	}
	$tdDeptRef.append($deptDivListRef)
	$rowRef.append($tdDeptRef)

	let $tdSalaryRef = $('<td>')

	const $salaryDivRef = $('<div>', {
		class: 'flex items-center justify-self-center',
	})

	const $salarySpanRef = $('<span>', {
		text: `$ ${emp.salary}`,
	})
	$salaryDivRef.append($salarySpanRef)
	$tdSalaryRef.append($salaryDivRef)
	$rowRef.append($tdSalaryRef)

	let $tdDateRef = $('<td>')

	const $dateDivRef = $('<div>', {
		class: 'flex items-center justify-self-center',
	})

	const $dateSpanRef = $('<span>', {
		text: `${emp.day} ${emp.month} ${emp.year}`,
	})
	$dateDivRef.append($dateSpanRef)
	$tdDateRef.append($dateDivRef)
	$rowRef.append($tdDateRef)

	let $tdActionRef = $('<td>')

	const $actionDivRef = $('<div>', {
		class: 'flex gap-6 items-center justify-self-center',
	})

	const $imgUpdateRef = $('<img>', {
		class: 'h-4 w-4 cursor-pointer',
		src: 'assets/pen.png',
		alt: 'edit',
		id: emp.id,
	})

	$imgUpdateRef.click(() => {
		window.location.href = `add-emp.html?id=${emp.id}`
	})

	const $imgDeleteRef = $('<img>', {
		class: 'h-4 w-4 cursor-pointer',
		src: 'assets/delete.png',
		alt: 'delete',
		id: emp.id,
	})

	$imgDeleteRef.click(() => deleteEmp(emp.id))

	$actionDivRef.append($imgUpdateRef, $imgDeleteRef)
	$tdActionRef.append($actionDivRef)
	$rowRef.append($tdActionRef)

	$tableBodyRef.append($rowRef)
}
