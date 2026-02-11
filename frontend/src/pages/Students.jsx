import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import Button from '../components/common/Button';
import { studentService } from '../services/studentService';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBranch, setFilterBranch] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    branch: '',
    skills: ''
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const data = await studentService.getStudents();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await studentService.addStudent(formData);
      setShowModal(false);
      setFormData({ name: '', branch: '', skills: '' });
      fetchStudents();
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.skills?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBranch = filterBranch === 'all' || student.branch === filterBranch;
    return matchesSearch && matchesBranch;
  });

  const branches = [...new Set(students.map(s => s.branch))];

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="section-header">
        <div>
          <h1 className="section-title">Students</h1>
          <p style={{ color: 'var(--color-text-secondary)', marginTop: 'var(--spacing-xs)' }}>
            Manage student profiles and track placement status
          </p>
        </div>
        <Button 
          variant="primary" 
          icon={<Plus size={20} />}
          onClick={() => setShowModal(true)}
        >
          Add Student
        </Button>
      </div>

      {/* Filters */}
      <div className="card" style={{ marginBottom: 'var(--spacing-lg)' }}>
        <div style={{ display: 'flex', gap: 'var(--spacing-md)', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '250px' }}>
            <div style={{ position: 'relative' }}>
              <Search 
                size={20} 
                style={{ 
                  position: 'absolute', 
                  left: '12px', 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  color: 'var(--color-text-tertiary)'
                }} 
              />
              <input
                type="text"
                placeholder="Search by name or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ paddingLeft: '40px' }}
              />
            </div>
          </div>
          
          <div style={{ minWidth: '200px' }}>
            <select 
              value={filterBranch}
              onChange={(e) => setFilterBranch(e.target.value)}
            >
              <option value="all">All Branches</option>
              {branches.map(branch => (
                <option key={branch} value={branch}>{branch}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="card">
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Branch</th>
                <th>Skills</th>
                <th>Placement Status</th>
                <th>Company</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td style={{ fontWeight: '600' }}>{student.name}</td>
                  <td>{student.branch}</td>
                  <td>
                    <div style={{ 
                      display: 'flex', 
                      gap: 'var(--spacing-xs)',
                      flexWrap: 'wrap'
                    }}>
                      {student.skills?.split(',').slice(0, 3).map((skill, idx) => (
                        <span 
                          key={idx}
                          className="badge badge-info"
                        >
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <span className={`badge badge-${student.placed === 'Yes' ? 'success' : 'warning'}`}>
                      {student.placed === 'Yes' ? 'Placed' : 'Not Placed'}
                    </span>
                  </td>
                  <td>
                    {student.placed_company ? (
                      <span style={{ color: 'var(--color-accent)', fontWeight: '500' }}>
                        {student.placed_company}
                      </span>
                    ) : (
                      <span style={{ color: 'var(--color-text-tertiary)' }}>-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Student Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Add New Student</h2>
              <button 
                onClick={() => setShowModal(false)}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: 'var(--color-text-secondary)'
                }}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 'var(--spacing-md)' }}>
                <label>Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div style={{ marginBottom: 'var(--spacing-md)' }}>
                <label>Branch</label>
                <input
                  type="text"
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  required
                  placeholder="e.g., Computer Science"
                />
              </div>

              <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                <label>Skills (comma-separated)</label>
                <input
                  type="text"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  required
                  placeholder="e.g., Python, JavaScript, React"
                />
              </div>

              <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'flex-end' }}>
                <Button 
                  variant="secondary" 
                  onClick={() => setShowModal(false)}
                  type="button"
                >
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Add Student
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Students;