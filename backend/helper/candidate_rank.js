function candidateRanked(candidates, requiredSkills, skillWeight, behaviourWeight, cgpaWeight) {
    return candidates.map(candidate => {
      // Count the number of matching skills
      const matchingSkills = candidate.skills.filter(skill =>
        requiredSkills.includes(skill)
      ).length;
  
      // Check if the candidate has all required skills
      const hasAllSkills = matchingSkills === requiredSkills.length;
  
      // Assign skill score
      const skillScore = hasAllSkills
        ? skillWeight * requiredSkills.length // Full score for having all required skills
        : skillWeight * matchingSkills;      // Proportional score for partial match
  
      // Calculate the overall score
      const score = skillScore +
                    (candidate.behaviourRemark * behaviourWeight) +
                    (candidate.cgpa * cgpaWeight);
  
      return { ...candidate, score }; // Add the score to the candidate object
    }).sort((a, b) => b.score - a.score); // Sort candidates by score in descending order
  }

  module.exports={candidateRanked};