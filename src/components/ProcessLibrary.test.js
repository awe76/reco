import { render, screen, act } from '@testing-library/react';
import { ProcessLibrary } from './ProcessLibrary';

test('render process library', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
        json: () => Promise.resolve({
            mds: [
                {
                    anchors: {
                        teams: ['Finance_legal', 'Finance_purchases']
                    },
                    description: 'FinanceTeam',
                    id: '1',
                    name: 'Finance'
                },
            ]
        })
    });

    await act(async () => {
        render(<ProcessLibrary />);
    });

    expect(screen.getByText('FinanceTeam')).toBeInTheDocument();
    expect(screen.getByText('Finance')).toBeInTheDocument();
});