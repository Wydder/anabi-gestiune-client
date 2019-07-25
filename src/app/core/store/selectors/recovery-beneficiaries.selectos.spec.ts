import { RecoveryBeneficiary } from '../../models';
import { CoreState, State } from '../reducers/index';
import { RecoveryBeneficiariesState } from '../reducers/recovery-beneficiaries.reducer';
import * as fromSelectors from './recovery-beneficiaries.selectors';

describe('RecoveryBeneficiaries Selectors', () => {
  let state: State;
  let coreState: CoreState;

  const theRecoveryBeneficiaries = [
    new RecoveryBeneficiary({ id: 1, name: 'test 1' }),
    new RecoveryBeneficiary({ id: 2, name: 'test 2' }),
    new RecoveryBeneficiary({ id: 3, name: 'test 3' }),
  ];

  const getEntitiesAsArray = (aState: State) => {
    return Object.keys(aState.core.recoveryBeneficiaries.entities).map(id => aState.core.recoveryBeneficiaries.entities[id]);
  };

  const getEntitiesAsObjects = (aState: State) => {
    const theResult: { [id: number]: RecoveryBeneficiary } = {};
    Object.keys(aState.core.recoveryBeneficiaries.entities).forEach(id => {
      theResult[id] = new RecoveryBeneficiary(aState.core.recoveryBeneficiaries.entities[id]);
    });

    return theResult;
  };

  const getEntitiesAsArrayOfObjects = (aState: State) => {
    return Object.keys(aState.core.recoveryBeneficiaries.entities)
      .map(id => new RecoveryBeneficiary(aState.core.recoveryBeneficiaries.entities[id]));
  };

  beforeEach(() => {
    state = {
      core: {
        recoveryBeneficiaries: {
          entities: {
            1: theRecoveryBeneficiaries[0].toJson(),
            2: theRecoveryBeneficiaries[1].toJson(),
            3: theRecoveryBeneficiaries[2].toJson(),
          },
          loaded: true,
          loading: false,
        } as RecoveryBeneficiariesState,
      } as CoreState,
    } as State;

    coreState = state.core;
  });

  describe('getRecoveryBeneficiariesState', () => {
    it('should get the RecoveryBeneficiaries state', () => {
      expect(fromSelectors.getRecoveryBeneficiariesState(state)).toEqual(coreState.recoveryBeneficiaries);
    });
  });

  describe('getRecoveryBeneficiariesEntities', () => {
    it('should get the entities', () => {
      expect(fromSelectors.getRecoveryBeneficiariesEntities(state)).toEqual(getEntitiesAsObjects(state));
    });
  });

  describe('getAllRecoveryBeneficiaries', () => {
    it('should get the recovery beneficiaries', () => {
      const expectedResult = getEntitiesAsArrayOfObjects(state);
      expect(fromSelectors.getAllRecoveryBeneficiaries(state)).toEqual(expectedResult);
    });
  });

  describe('getRecoveryBeneficiariesLoaded', () => {
    it('should get the loaded status', () => {
      expect(fromSelectors.getRecoveryBeneficiariesLoaded(state)).toEqual(coreState.recoveryBeneficiaries.loaded);
    });
  });

  describe('getRecoveryBeneficiariesLoading', () => {
    it('should get the loading status', () => {
      expect(fromSelectors.getRecoveryBeneficiariesLoading(state)).toEqual(coreState.recoveryBeneficiaries.loading);
    });
  });
});
