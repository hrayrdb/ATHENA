import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { CustomButton } from '../components';
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation
} from '../config/motion';

const Info = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, password } = location.state;

  const [formData, setFormData] = useState({
    name: '',
    yearOfBirth: '',
    educationLevel: '',
    occupation: '',
    workingHoursPerDay: '',
    momPassed: false,
    dadPassed: false,
    parentsDivorced: false,
    numberOfSiblings: '',
    relationshipStatus: '',
    numberOfChildren: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = '* Name is required';
    } else if (!/^[a-zA-Z]+$/.test(formData.name)) {
      errors.name = 'Name should be made of letters';
    }
    if (!formData.yearOfBirth.trim()) {
      errors.yearOfBirth = '* Year of birth is required';
    } else if (formData.yearOfBirth < 1940 || formData.yearOfBirth > (new Date().getFullYear() - 12)) {
      errors.yearOfBirth = '* Year of birth should be between 1940 and ' + (new Date().getFullYear() - 12);
    }
    if (!formData.educationLevel.trim()) {
      errors.educationLevel = '* Education Level is required';
    }
    if (!formData.occupation.trim()) {
      errors.occupation = '* Occupation is required';
    } else if (!/^[a-zA-Z]+$/.test(formData.occupation)) {
      errors.occupation = '* Occuaption should be made of letters';
    }
    if (!formData.workingHoursPerDay.trim()) {
      errors.workingHoursPerDay = '* Working hours per day is required';
    } else if (formData.workingHoursPerDay < 0 || formData.workingHoursPerDay >= 20) {
      errors.workingHoursPerDay = '* Working hours is not logical, it must be between 0 and 20 hours';
    }
    if (!formData.numberOfSiblings.trim()) {
      errors.numberOfSiblings = '* Number of siblings is required';
    } else if (formData.numberOfSiblings < 0) {
      errors.numberOfSiblings = '* Number of siblings can not be under 0';
    }
    if (!formData.relationshipStatus.trim()) {
      errors.relationshipStatus = '* Relationship status is required';
    }
    if (!formData.numberOfChildren.trim()) {
      errors.numberOfChildren = '* Number of children is required';
    } else if (formData.numberOfChildren < 0) {
      errors.numberOfChildren = '* Number of children can not be under 0';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      const userData = {
        email,
        password,
        ...formData,
        name: formData.name.toLowerCase(),
        educationLevel: formData.educationLevel.toLowerCase(),
        occupation: formData.occupation.toLowerCase(),
        relationshipStatus: formData.relationshipStatus.toLowerCase()
      };
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      if (response.ok) {
        console.log('User created successfully');
        navigate('/clinic');
      } else {
        console.error('Failed to create user');
      }
    } else {
      console.log('Form validation failed');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <motion.section className="flex items-center justify-center min-h-screen p-6 h-full overflow-y-auto">
      <motion.div className="max-w-md w-full h-full">
        <motion.div {...headTextAnimation} className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight mb-5 font-bold">
            YOUR <br />INFORMATION
          </h1>
        </motion.div>

        <motion.div {...headContentAnimation}
          className="flex flex-col gap-7 items-start">
          <form onSubmit={handleSubmit} className="flex flex-col gap-7 items-start w-full">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="input w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            {errors.name && <div className="text-red-500 text-sm pl-3">{errors.name}</div>}

            <input
              type="number"
              name="yearOfBirth"
              placeholder="Year of Birth"
              value={formData.yearOfBirth}
              onChange={handleChange}
              className="input w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            {errors.yearOfBirth && <div className="text-red-500 text-sm pl-3">{errors.yearOfBirth}</div>}

            <select
              name="educationLevel"
              value={formData.educationLevel}
              onChange={handleChange}
              className="input w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value="">Select Education Level</option>
              <option value="Primary education">Primary education</option>
              <option value="Middle school">Middle school</option>
              <option value="High school">High school</option>
              <option value="University">University</option>
            </select>
            {errors.educationLevel && <div className="text-red-500 text-sm pl-3">{errors.educationLevel}</div>}

            <input
              type="text"
              name="occupation"
              placeholder="Occupation"
              value={formData.occupation}
              onChange={handleChange}
              className="input w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            {errors.occupation && <div className="text-red-500 text-sm pl-3">{errors.occupation}</div>}

            <input
              type="number"
              name="workingHoursPerDay"
              placeholder="No. of working hours per day"
              value={formData.workingHoursPerDay}
              onChange={handleChange}
              className="input w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            {errors.workingHoursPerDay && <div className="text-red-500 text-sm pl-3">{errors.workingHoursPerDay}</div>}

            <div className="flex items-center">
              <input
                type="checkbox"
                name="momPassed"
                checked={formData.parentsAlive}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="momPassed">Mom Passed Away</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="dadPassed"
                checked={formData.parentsAlive}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="dadPassed">Dad Passed Away</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="parentsDivorced"
                checked={formData.parentsDivorced}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="parentsDivorced">Parents Divorced</label>
            </div>

            <input
              type="number"
              name="numberOfSiblings"
              placeholder="No. of siblings"
              value={formData.numberOfSiblings}
              onChange={handleChange}
              className="input w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            {errors.numberOfSiblings && <div className="text-red-500 text-sm pl-3">{errors.numberOfSiblings}</div>}

            <select
              name="relationshipStatus"
              value={formData.relationshipStatus}
              onChange={handleChange}
              className="input w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value="">Select Relationship Status</option>
              <option value="Single">Single</option>
              <option value="In a relationship">In a relationship</option>
              <option value="Engaged">Engaged</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
            </select>
            {errors.relationshipStatus && <div className="text-red-500 text-sm pl-3">{errors.relationshipStatus}</div>}

            <input
              type="number"
              name="numberOfChildren"
              placeholder="No. of children"
              value={formData.numberOfChildren}
              onChange={
                handleChange}
              className="input w-full p-3 border border-gray-300 rounded-md focus
                              focus
                              focus
                              "
            />
            {errors.numberOfChildren && <div className="text-red-500 text-sm pl-3">{errors.numberOfChildren}</div>}

            <CustomButton
              type="filled"
              title="Submit"
              handleClick={handleSubmit}
              customStyles="w-full px-4 py-2.5 font-bold text-sm mt-4"
            />
          </form>

          <div style={{ height: '20px' }}></div>

        </motion.div>

      </motion.div>
    </motion.section>
  );
};

export default Info;
